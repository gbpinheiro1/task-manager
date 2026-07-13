import type { TaskCategory, TaskPriority } from "../models/task.model.js"

const BUSINESS_CATEGORIES: TaskCategory[] = ["Financeiro", "Marketing", "Vendas", "TI"]
const CATEGORIES: TaskCategory[] = [...BUSINESS_CATEGORIES, "Geral"]
const PRIORITIES: TaskPriority[] = ["Baixa", "Média", "Alta"]

const FALLBACK_CLASSIFICATION: TaskClassification = {
  category: "Geral",
  priority: "Média",
}

const REQUEST_TIMEOUT_MS = 20000
const RETRY_DELAY_MS = 1000

export interface TaskClassification {
  category: TaskCategory
  priority: TaskPriority
}

interface GeminiGenerateContentResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>
    }
  }>
}

function buildPrompt(title: string, description: string): string {
  return `Classifique a tarefa abaixo em uma categoria e uma prioridade.

Categorias possíveis: ${BUSINESS_CATEGORIES.join(", ")}.
Use "Geral" apenas quando a tarefa não se encaixar claramente em nenhuma dessas
categorias de negócio.
Prioridades possíveis: ${PRIORITIES.join(", ")}.

Título: ${title}
Descrição: ${description || "(sem descrição)"}

Escolha a categoria e a prioridade mais adequadas para esta tarefa.`
}

export class GeminiClassifierService {
  private readonly apiKey = process.env.GEMINI_API_KEY
  private readonly model = process.env.GEMINI_MODEL ?? "gemini-flash-latest"

  async classify(title: string, description: string): Promise<TaskClassification> {
    if (!this.apiKey) {
      console.warn("[GeminiClassifierService] GEMINI_API_KEY não definida, usando fallback")
      return FALLBACK_CLASSIFICATION
    }

    const prompt = buildPrompt(title, description)

    for (let attempt = 1; attempt <= 2; attempt++) {
      const result = await this.requestClassification(prompt)
      if (result) return result

      if (attempt === 1) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
      }
    }

    return FALLBACK_CLASSIFICATION
  }

  private async requestClassification(prompt: string): Promise<TaskClassification | null> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              thinkingConfig: { thinkingBudget: 0 },
              responseSchema: {
                type: "OBJECT",
                properties: {
                  category: { type: "STRING", enum: CATEGORIES },
                  priority: { type: "STRING", enum: PRIORITIES },
                },
                required: ["category", "priority"],
              },
            },
          }),
        },
      )

      if (!response.ok) {
        console.warn(`[GeminiClassifierService] Requisição falhou com status ${response.status}`)
        return null
      }

      const data = (await response.json()) as GeminiGenerateContentResponse
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (!text) {
        console.warn("[GeminiClassifierService] Resposta sem conteúdo de texto")
        return null
      }
      const parsed = JSON.parse(text)

      if (!CATEGORIES.includes(parsed.category) || !PRIORITIES.includes(parsed.priority)) {
        console.warn("[GeminiClassifierService] Resposta fora do formato esperado")
        return null
      }

      return { category: parsed.category, priority: parsed.priority }
    } catch (error) {
      console.warn("[GeminiClassifierService] Erro ao classificar tarefa:", error)
      return null
    } finally {
      clearTimeout(timeout)
    }
  }
}

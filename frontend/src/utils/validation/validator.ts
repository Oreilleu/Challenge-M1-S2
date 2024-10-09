import { z, ZodObject, type ZodRawShape } from 'zod'

/**
 * Valide un champ spécifique d'un formulaire en utilisant un schéma Zod.
 *
 * @template T - Le type des champs du schéma Zod, qui doit être une forme brute (`ZodRawShape`).
 *
 * @param {keyof z.infer<ZodObject<T>>} field - Le nom du champ à valider. Il doit correspondre à une clé du schéma Zod.
 * @param {ZodObject<T>} schema - Le schéma Zod utilisé pour valider les champs du formulaire.
 * @param {z.infer<ZodObject<T>>} form - Les données du formulaire, qui sont validées selon le schéma.
 * @param {Record<keyof z.infer<ZodObject<T>>, string>} errors - Un objet pour stocker les messages d'erreurs de validation.
 * Chaque clé doit correspondre à un champ du formulaire, et sa valeur sera un message d'erreur s'il y a une erreur de validation.
 *
 * @returns {boolean} - Retourne `true` si la validation du champ est réussie, sinon `false`.
 */

export const validateField = <T extends ZodRawShape>(
  field: keyof T,
  schema: ZodObject<T>,
  form: z.infer<ZodObject<T>>,
  errors: Record<keyof z.infer<ZodObject<T>>, string>
) => {
  const fieldToValidate = z.object({
    [field]: schema.shape[field]
  })

  const result = fieldToValidate.safeParse({ [field]: form[field] })

  errors[field] = ''

  if (!result.success) {
    errors[field] = result.error.errors[0].message
  }

  return result.success
}

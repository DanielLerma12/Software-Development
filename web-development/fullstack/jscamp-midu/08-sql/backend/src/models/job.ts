// ================================
// MODELO DE JOB
// ================================

import crypto from "node:crypto"
import { db } from '../db/database.js'
import type { Job, CreateJobDTO, UpdateJobDTO, JobFilters } from "../types.js"

// Base de datos en memoria (en producción sería una BD real)
const jobs: Job[] = [
  
]

// ================================
// CLASE DEL MODELO
// ================================

export class JobModel {
  // Obtener todos los jobs con filtros opcionales
  static async getAll(filters?: JobFilters): Promise<Job[]> {

    let query = `
      SELECT j.*, GROUP_CONCAT(jt.technology) AS technologies
      FROM jobs j
      JOIN job_technologies jt ON j.id = jt.job_id
    `

    const conditions: string[] = []
    const params: unknown[] = []

    if (filters?.tech) {
      conditions.push(``)
      params.push(filters.tech)
    }

    if (filters?.modality) {
      conditions.push(``)
      params.push(filters.modality)
    }

    if (filters?.level) {
      conditions.push(``)
      params.push(filters.level)
    }

    if (conditions.length > 0) {
      query += 'WHERE ' + conditions.join(' AND ')
    }

    query += ' GROUP BY j.id'

    const rows = db.prepare(query).all(...params)

    return rows.map(row => ({
      id: row.id,
      title: row.title,
      company: row.company,
      location: row.location,
      description: row.description,
      data: {
        technology: row.technologies.split(','),
        modality: row.modality,
        level: row.level
      }
    }))
  }

  // Obtener un job por ID
  static async getById(id: string): Promise<Job | undefined> {
    return jobs.find(job => job.id === id)
  }

  // Crear un nuevo job
  static async create(input: CreateJobDTO): Promise<Job> {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...input
    }
    
    jobs.push(newJob)
    return newJob
  }

  // Eliminar un job
  static async delete(id: string): Promise<boolean> {
    const index = jobs.findIndex(job => job.id === id)
    if (index === -1) return false
    
    jobs.splice(index, 1)
    return true
  }

  // Actualizar un job
  static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
    const index = jobs.findIndex(job => job.id === id)
    if (index === -1) return null
    
    // Merge del job existente con los cambios
    jobs[index] = {
      ...jobs[index],
      ...input,
      // Si hay data parcial, hacer merge
      data: input.data 
        ? { ...jobs[index].data, ...input.data }
        : jobs[index].data
    }
    
    return jobs[index]
  }
}

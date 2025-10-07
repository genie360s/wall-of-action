// src/types/database.ts

export interface ActionRecord {
  id?: number
  created_at?: string
  name: string
  country: string
  actiontext: string
  voice: string
  image: string
}

export interface ActionInsert {
  name: string
  country: string
  actiontext: string
  voice: string
  image: string
}

export interface SubmissionData {
  image: File | null
  imageUrl: string
  name: string
  country: string
  voice: string
  actionDescription: string
}

export interface UploadResult {
  success: boolean
  imageUrl?: string
  error?: string
}

export interface SubmissionResult {
  success: boolean
  data?: ActionRecord
  error?: string
}
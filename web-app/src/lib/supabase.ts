// src/lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { 
  ActionInsert, 
  ActionRecord, 
  SubmissionData, 
  UploadResult, 
  SubmissionResult 
} from '@/types/database'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase env variables VITE_SUPABASE_URL or VITE_SUPABASE_KEY')
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)

/**
 * Upload an image to the actors_images storage bucket
 * @param file - The image file to upload
 * @param fileName - Optional custom filename
 * @returns Promise with upload result and public URL
 */
export async function uploadActionImage(file: File, fileName?: string): Promise<UploadResult> {
  // Generate unique filename if not provided
  const fileExt = file.name.split('.').pop()
  const finalFileName = fileName || `action_${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`

  try {
    console.log('🖼️ Starting image upload to storage bucket:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      finalFileName,
      bucketName: 'actors_images'
    })

    // Upload file to storage
    const { data, error } = await supabase.storage
      .from('actors_images')
      .upload(finalFileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('❌ Image upload failed:', {
        error: error.message,
        details: error,
        fileName: finalFileName,
        bucketName: 'actors_images'
      })
      return { success: false, error: error.message }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('actors_images')
      .getPublicUrl(data.path)

    console.log('✅ Image upload successful:', {
      uploadPath: data.path,
      publicUrl,
      fileName: finalFileName
    })

    return { 
      success: true, 
      imageUrl: publicUrl 
    }
  } catch (error) {
    console.error('❌ Image upload exception:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error,
      fileName: finalFileName
    })
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown upload error' 
    }
  }
}

/**
 * Insert a new action record into the actions table
 * @param actionData - The action data to insert
 * @returns Promise with insertion result
 */
export async function insertAction(actionData: ActionInsert): Promise<SubmissionResult> {
  try {
    console.log('📝 Inserting action data into database:', {
      tableName: 'actions',
      data: actionData,
      hasImage: !!actionData.image,
      imageUrl: actionData.image
    })

    const { data, error } = await supabase
      .from('actions')
      .insert([actionData])
      .select()
      .single()

    if (error) {
      console.error('❌ Database insert failed:', {
        error: error.message,
        details: error,
        actionData
      })
      return { success: false, error: error.message }
    }

    console.log('✅ Action inserted successfully:', {
      insertedData: data,
      id: data.id
    })

    return { 
      success: true, 
      data: data as ActionRecord 
    }
  } catch (error) {
    console.error('❌ Database insert exception:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error,
      actionData
    })
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown insertion error' 
    }
  }
}

/**
 * Complete submission: upload image and save action data
 * @param submissionData - Complete form data including image
 * @returns Promise with complete submission result
 */
export async function submitAction(submissionData: SubmissionData): Promise<SubmissionResult> {
  try {
    console.log('🚀 Starting action submission process:', {
      submissionData: {
        name: submissionData.name,
        country: submissionData.country,
        voice: submissionData.voice,
        actionDescription: submissionData.actionDescription,
        hasImage: !!submissionData.image,
        imageFile: submissionData.image ? {
          name: submissionData.image.name,
          size: submissionData.image.size,
          type: submissionData.image.type
        } : null,
        imageUrl: submissionData.imageUrl
      }
    })

    let imageUrl = ''

    // Upload image if provided
    if (submissionData.image) {
      console.log('📤 Image detected, starting upload process...')
      const uploadResult = await uploadActionImage(submissionData.image)
      
      if (!uploadResult.success) {
        console.error('❌ Submission failed due to image upload error:', uploadResult.error)
        return { 
          success: false, 
          error: `Image upload failed: ${uploadResult.error}` 
        }
      }
      
      imageUrl = uploadResult.imageUrl || ''
      console.log('✅ Image upload completed, proceeding with database insert...')
    } else {
      console.log('ℹ️ No image provided, proceeding with database insert only...')
    }

    // Prepare action data
    const actionData: ActionInsert = {
      name: submissionData.name,
      country: submissionData.country,
      actiontext: submissionData.actionDescription,
      voice: submissionData.voice,
      image: imageUrl
    }

    console.log('📋 Prepared action data for database:', actionData)

    // Insert action record
    const insertResult = await insertAction(actionData)
    
    if (!insertResult.success) {
      console.error('❌ Submission failed due to database insert error:', insertResult.error)
      return { 
        success: false, 
        error: `Action save failed: ${insertResult.error}` 
      }
    }

    console.log('🎉 Action submission completed successfully!', {
      submittedAction: insertResult.data
    })

    return { 
      success: true, 
      data: insertResult.data 
    }
  } catch (error) {
    console.error('❌ Submission process exception:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error,
      submissionData: {
        name: submissionData.name,
        country: submissionData.country,
        voice: submissionData.voice,
        hasImage: !!submissionData.image
      }
    })
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown submission error' 
    }
  }
}
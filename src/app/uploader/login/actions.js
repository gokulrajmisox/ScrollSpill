'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/src/utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/uploader/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/uploader')
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/uploader/login')
}

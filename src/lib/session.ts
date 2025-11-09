// src/lib/session.ts
'use client'
export function setAuth(token: string) {
  localStorage.setItem('swapp:token', token)
}
export function getAuth() {
  return localStorage.getItem('swapp:token')
}
export function clearAuth() {
  localStorage.removeItem('swapp:token')
}

'use client'

import React from 'react'
import { Header } from './components/Header/Header'
import { MainContent } from './components/MainContent/MainContent'
import { useFeatureFlags } from '@/services/growthbook/useFeatureFlags'
import { useGetUserById } from '@/services/api/users'

export const Users = () => {
    const { isEnableTestingFlag } = useFeatureFlags();
    const userData = useGetUserById({userId: "1"})
    console.log("USER DATA", userData.data)
  return (
    <div>
        <Header/>
        <MainContent/>
        
        <section>
          <h2>GrowthBook Feature Flags</h2>
          <div>
            <h3>Testing Flag Status:</h3>
            <p>Flag activo: {isEnableTestingFlag ? 'Sí' : 'No'}</p>
            {isEnableTestingFlag && (
              <div style={{ padding: '10px', backgroundColor: '#e8f5e8', border: '1px solid #4caf50' }}>
                ✅ Feature flag funcionando correctamente
              </div>
            )}
          </div>
        </section>
    </div>
  )
}

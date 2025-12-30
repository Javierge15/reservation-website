'use client' // Indica que esto es lo que ve el usuario (React)

import { useFormState } from 'react-dom';
import { createReservation } from './actions'; // Importamos la lógica del servidor

// Estado inicial del formulario
const initialState = {
  message: null,
  success: false,
};

export default function Home() {
  // Conectamos el formulario con la Server Action
  const [state, formAction] = useFormState(createReservation, initialState);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="z-10 max-w-md w-full items-center justify-between font-mono text-sm bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reservar Mesa
        </h1>

        <form action={formAction} className="flex flex-col gap-4">
          
          {/* Campo Nombre */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-600">Nombre</label>
            <input 
              name="nombre" 
              type="text" 
              placeholder="Ej: Juan Pérez"
              required
              className="p-2 border rounded-md border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"            />
          </div>

          {/* Campo Email */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-600">Email</label>
            <input 
              name="email" 
              type="email" 
              placeholder="tu@email.com"
              required
              className="p-2 border rounded-md border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Campo Fecha */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-600">Fecha y Hora</label>
            <input 
              name="fecha" 
              type="datetime-local" 
              required
              className="p-2 border rounded-md border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Botón de envío */}
          <button 
            type="submit"
            className="mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            Confirmar Reserva
          </button>

          {/* Mensaje de respuesta (Feedback) */}
          {state.message && (
            <p className={`text-center mt-2 ${state.success ? 'text-green-600' : 'text-red-600'}`}>
              {state.message}
            </p>
          )}

        </form>
      </div>
    </main>
  );
}
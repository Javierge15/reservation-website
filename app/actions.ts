'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Definimos la estructura de los datos (TypeScript)
type State = {
  message: string | null;
  success: boolean;
};

export async function createReservation(prevState: State, formData: FormData): Promise<State> {
  // 1. Extraer datos del formulario HTML
  const email = formData.get('email') as string;
  const nombre = formData.get('nombre') as string;
  const fecha = formData.get('fecha') as string;

  // 2. Validación básica (en un proyecto real usaríamos una librería llamada Zod aquí)
  if (!email || !fecha) {
    return { success: false, message: 'Faltan datos obligatorios' };
  }

  try {
    // 3. Llamada a Resend
    const { data, error } = await resend.emails.send({
      from: 'Reservas <onboarding@resend.dev>', // Usa este remitente para pruebas gratuitas
      to: [email], // En modo test, solo a tu propio email verificado
      subject: 'Confirmación de Reserva',
      html: `
        <div style="font-family: sans-serif;">
          <h1>¡Hola ${nombre}!</h1>
          <p>Tu mesa ha sido reservada para el día: <strong>${fecha}</strong>.</p>
          <p>Gracias por confiar en nosotros.</p>
        </div>
      `,
    });

    if (error) {
      console.error(error);
      return { success: false, message: 'Error al enviar el correo' };
    }

    return { success: true, message: '¡Reserva confirmada! Revisa tu email.' };
    
  } catch (e) {
    return { success: false, message: 'Error del servidor' };
  }
}
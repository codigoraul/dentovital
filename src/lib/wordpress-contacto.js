// Configuración de WordPress para datos de contacto
const WP_URL = 'http://localhost:10089'; // Cambiar por tu URL de WordPress

/**
 * Obtiene los datos de contacto desde ACF Options
 */
export async function getContactoInfo() {
  try {
    const response = await fetch(`${WP_URL}/wp-json/acf/v3/options/informacion-contacto`);
    
    if (!response.ok) {
      throw new Error('Error al obtener información de contacto');
    }
    
    const data = await response.json();
    
    return {
      clinica: {
        nombre: data.acf?.clinica_nombre || 'Clínica Dentovital',
        slogan: data.acf?.clinica_slogan || 'Clínica Odontológica'
      },
      direccion: {
        completa: data.acf?.direccion_completa || '',
        ciudad: data.acf?.ciudad || 'Antofagasta',
        region: data.acf?.region || 'Región de Antofagasta',
        googleMapsUrl: data.acf?.google_maps_url || '',
        coordenadas: data.acf?.coordenadas || null
      },
      telefonos: data.acf?.telefonos || [],
      emails: {
        principal: data.acf?.email_principal || '',
        adicionales: data.acf?.emails_adicionales || []
      },
      horarios: data.acf?.horarios || [],
      redes: {
        facebook: data.acf?.facebook_url || '',
        instagram: data.acf?.instagram_url || '',
        tiktok: data.acf?.tiktok_url || '',
        linkedin: data.acf?.linkedin_url || '',
        youtube: data.acf?.youtube_url || ''
      },
      whatsapp: {
        numero: data.acf?.whatsapp_numero || '56937725890',
        mensaje: data.acf?.whatsapp_mensaje || 'Hola, me gustaría agendar una hora en Clínica Dentovital',
        url: `https://wa.me/${data.acf?.whatsapp_numero || '56937725890'}?text=${encodeURIComponent(data.acf?.whatsapp_mensaje || 'Hola, me gustaría agendar una hora')}`
      },
      footer: {
        texto: data.acf?.footer_texto || '',
        copyright: data.acf?.copyright_texto || '© 2025 Clínica Dentovital. Todos los derechos reservados.'
      },
      agendarHoraUrl: data.acf?.agendar_hora_url || 'https://ff.healthatom.io/ZCokP6'
    };
  } catch (error) {
    console.error('Error fetching contacto info:', error);
    
    // Datos de fallback
    return {
      clinica: {
        nombre: 'Clínica Dentovital',
        slogan: 'Clínica Odontológica'
      },
      direccion: {
        completa: 'Av. Grecia 1050, Oficina 1010\nAntofagasta, Chile',
        ciudad: 'Antofagasta',
        region: 'Región de Antofagasta',
        googleMapsUrl: '',
        coordenadas: null
      },
      telefonos: [
        {
          telefono_numero: '+56 9 3772 5890',
          telefono_tipo: 'whatsapp'
        }
      ],
      emails: {
        principal: 'contacto@dentovital.cl',
        adicionales: []
      },
      horarios: [
        {
          dias: 'Lunes a Viernes',
          horario: '09:00 - 19:00'
        },
        {
          dias: 'Sábados',
          horario: '09:00 - 14:00'
        }
      ],
      redes: {
        facebook: '',
        instagram: '',
        tiktok: '',
        linkedin: '',
        youtube: ''
      },
      whatsapp: {
        numero: '56937725890',
        mensaje: 'Hola, me gustaría agendar una hora en Clínica Dentovital',
        url: 'https://wa.me/56937725890?text=Hola,%20me%20gustaría%20agendar%20una%20hora'
      },
      footer: {
        texto: 'Clínica Dentovital es tu centro de odontología moderna y estética facial en Antofagasta.',
        copyright: '© 2025 Clínica Dentovital. Todos los derechos reservados.'
      },
      agendarHoraUrl: 'https://ff.healthatom.io/ZCokP6'
    };
  }
}

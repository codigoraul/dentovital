// WordPress API Configuration
const WP_API = "http://localhost:10089/wp-json/wp/v2";
const WP_URL = 'http://localhost:10089';

/**
 * Obtiene todas las especialidades desde WordPress
 */
export async function getEspecialidades() {
  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/especialidades?_embed&per_page=100`);
    
    if (!response.ok) {
      throw new Error('Error al obtener especialidades');
    }
    
    const data = await response.json();
    
    return data.map(esp => ({
      id: esp.id,
      titulo: esp.title.rendered,
      slug: esp.acf?.slug_especialidad || esp.slug,
      descripcion: esp.acf?.descripcion_corta || esp.excerpt.rendered.replace(/<[^>]*>/g, ''),
      contenido: esp.content.rendered,
      imagen: getImageUrl(esp),
      imagenHero: esp.acf?.imagen_hero || getImageUrl(esp),
      contenidoPrincipal: esp.acf?.contenido_principal || esp.content.rendered,
      galeria: esp.acf?.galeria || [],
      orden: esp.acf?.orden || 0,
      acf: esp.acf || {}
    })).sort((a, b) => a.orden - b.orden);
  } catch (error) {
    console.error('Error fetching especialidades:', error);
    return [];
  }
}

/**
 * Obtiene una especialidad específica por slug
 */
export async function getEspecialidadBySlug(slug) {
  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/especialidades?slug=${slug}&_embed`);
    
    if (!response.ok) {
      throw new Error('Error al obtener especialidad');
    }
    
    const data = await response.json();
    
    if (data.length === 0) {
      return null;
    }
    
    const esp = data[0];
    
    return {
      id: esp.id,
      titulo: esp.title.rendered,
      slug: esp.acf?.slug_especialidad || esp.slug,
      descripcion: esp.acf?.descripcion_corta || esp.excerpt.rendered.replace(/<[^>]*>/g, ''),
      contenido: esp.content.rendered,
      imagen: getImageUrl(esp),
      imagenHero: esp.acf?.imagen_hero || getImageUrl(esp),
      contenidoPrincipal: esp.acf?.contenido_principal || esp.content.rendered,
      galeria: esp.acf?.galeria || [],
      orden: esp.acf?.orden || 0,
      acf: esp.acf || {}
    };
  } catch (error) {
    console.error('Error fetching especialidad:', error);
    return null;
  }
}

function getImageUrl(post) {
  if (post._embedded && post._embedded['wp:featuredmedia']) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return '/images/placeholder.jpg';
}

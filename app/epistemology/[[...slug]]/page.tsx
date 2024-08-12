
//'use client'
import Atom from '../../../components/atom'
import Atoms from '../../../components/atoms'

import { getProductsByAtomId, getAtoms } from '../../../lib/anatomy'

export async function generateStaticParams() {
  const { atoms } = await getAtoms()

  if (!atoms) {
    return []
  }

  const slugs = []
  for (const atom of atoms) {
    const { products } = await getProductsByAtomId(atom.id)
    if (!products) {
      slugs.push([atom.id])
      continue
    }

    for (const product of products) {
      slugs.push([atom.id, 'products', product.id])
    }
  }

  const paths = slugs.map(slug => ({ slug }))
  return paths
}

export default function AtomPage({ params }: { params: { slug?: string[] } }) {
    const { slug } = params
  
    if (!slug) {
      return <Atoms />
    }
  
    return <Atom slug={slug} />
    
  }

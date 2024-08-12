import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAtoms } from '../../..//lib/anatomy'
import { cn } from '../../../lib/utils'

export default async function AtomsLayout({
  params,
  children
}: {
  params: { slug?: string[] }
  children: React.ReactNode
}) {
  const { atoms, error } = await getAtoms()
  if (!atoms || error) {
    notFound()
  }

  const { slug } = params
  const atomId = slug?.[0]

  return (
    <section className='py-12'>
      <div className='container'>
        <h1 className='text-2xl font-semibold'>All Atoms</h1>

        <div className='mt-6 flex overflow-hidden rounded-lg shadow dark:shadow-gray-700'>
          <ul className='flex flex-col gap-2 bg-gray-100 p-8 text-sm dark:bg-gray-800'>
            {atoms?.map(atom => (
              <li key={atom.id}>
                <Link
                  href={`/atoms/${atom.id}`}
                  className={cn(
                    atom.id === atomId &&
                      'underline decoration-sky-500 underline-offset-4'
                  )}
                >
                  {atom.name}
                </Link>
              </li>
            ))}
          </ul>

          {children}
        </div>
      </div>
    </section>
  )
}
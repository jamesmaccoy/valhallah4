import Link from 'next/link'


import { cn } from '../lib/utils'
import { getProductsByAtomId, getAtomById } from '../lib/anatomy'
import { notFound } from 'next/navigation'

export default async function Atom({ slug }: { slug: string[] }) {
  const atomId = slug[0]
  const productId = slug[2]
  const { atom, error } = await getAtomById(atomId) // Changed 'atom' to 'product'
  if (!atom || error) {
    notFound()
  }

  const { products } = await getProductsByAtomId(atomId)
  const product = products?.find(todo => todo.id === productId)

  return (
    <section className='grow'>
      <div className='p-8'>
        <div className='flex items-center gap-3'>
         
          <div>
            <h2 className='font-semibold'>{atom.name}</h2>
            <p className='text-sm text-gray-500'>{atom.name}</p>
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-12 lg:flex-row'>
          <ul className='flex list-disc flex-col gap-1 p-8 text-sm'>
            <h3 className='mb-3 border-b pb-3 text-lg font-semibold'>Products</h3>
            {products?.map(product => (
              <li key={product.id} className='list-item list-inside'>
                <Link
                  href={`/atoms/${atomId}/products/${product.id}`}
                  className={cn(
                    product.id === productId &&
                      'underline decoration-sky-500 underline-offset-4'
                  )}
                >
                  {product.title}
                </Link>
              </li>
            ))}
          </ul>
          {product && (
            <div className='grow rounded-lg p-8 shadow dark:shadow-gray-700'>
              <h3 className='mb-3 border-b pb-3 text-lg font-semibold'>
                Details
              </h3>
              <div className='mt-4 flex items-start justify-between text-sm'>
                <div>
                  <h4 className=''>{product.title}</h4>
                  <p className='text-sm text-gray-500'>{product.createdAt}</p>
                </div>
                <p
                  className={cn(
                    'text-sm',
                    product.isCompleted ? 'text-emerald-500' : 'text-rose-500'
                  )}
                >
                  {product.isCompleted ? 'Completed' : 'Not completed'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
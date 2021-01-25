import Head from 'next/head'
import styles from '../styles/Home.module.css'
import products from '../products.json'

export default function Home() {
  console.log(products)

  return (
    <div className={styles.container}>
      <Head>
        <title>Space Jelly Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Space Jelly Shop
        </h1>

        <p className={styles.description}>
          The best space jellyfish swag on the web!
        </p>

        <ul className={styles.grid}>
          {products.map(product => {
            const {id, title, price, image, description} = product
            return (
              <li key={id} className={styles.card}>
                <a href="https://nextjs.org/docs">
                  <img src={image} alt={title}/>
                  <h3>{title}</h3>
                  <p>R${price}</p>
                  <p>{description}</p>
                </a>
              </li>
            )
          })}          
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

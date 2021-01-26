import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../../hooks/use-cart'
import styles from './Nav.module.css'
import Link from 'next/link'

const Nav = () => {
    let { subtotal, checkout } = useCart()

    return(
        <nav className={styles.nav}>

            <Link href='../'>
                <a>
                    <p className={styles.navTitle}>
                        Space Jelly Shop
                    </p>
                </a>
            </Link>
            <Link href="/cart">
                <a>
                    <p className={styles.navCart}>
                        <button>
                            <FaShoppingCart /> R${subtotal}
                        </button>
                    </p>
                </a>
            </Link>
        </nav>
    )
}

export default Nav
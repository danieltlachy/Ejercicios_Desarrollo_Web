<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp_blogpersonal' );

/** Database username */
define( 'DB_USER', 'wordpress' );

/** Database password */
define( 'DB_PASSWORD', 'daniel' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '=>ZYpX>$@hapRGjLfy#tC0aHe/j$HMr3=LJ*~!^Bgsrlic5]f6,u3p$.AWVy1MyW' );
define( 'SECURE_AUTH_KEY',  'o?J{yI#9B:V9k:.tavf6elm@-`;,Xk>f)-07$)PVQW3cb`wITiC#Mxz)[7.Ag@_$' );
define( 'LOGGED_IN_KEY',    ' pqKPA#?4wv,5`iP6^$q,}PuGoZU8/A4k?qJEuLw11#f6Q{~L<VbzS=2-E8lPESh' );
define( 'NONCE_KEY',        '@cp}]9Pr5*2i||HEyP] S7).Iw!`V.7{bA?0(oQvAte1~cKu7DW:Wz`qYnqn~RK,' );
define( 'AUTH_SALT',        'pKj]3`vqP5at%g9iF j<URCY(F+aX}6#Bi]]HH{=s2Y:IvS8!9$8I#/@]rDIv8Ym' );
define( 'SECURE_AUTH_SALT', '7NOl:DbjuW~:!HVTO9{aZnupew6|bD{+KYWKw:q.`;Vn!?X?%}QW<yg<c0X].)>I' );
define( 'LOGGED_IN_SALT',   't!rTSNK,21aFr&r8Lu2T{?C]Xwp}*U0_AWo)2UX5mAJ2dOu;}i)Pzq^B-x -;mW!' );
define( 'NONCE_SALT',       'o6nnpV`Pb,Vf@me2*eHM;$k+iUXiPKkp=}R;l[U7UzW2lS(_3AfstyLRwJ<./c1@' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

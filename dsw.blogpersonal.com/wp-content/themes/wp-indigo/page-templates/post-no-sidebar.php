<?php
/**
 * Template Name: No Sidebar
 * Template Post Type: post
 *
 * The template for displaying single posts in a single column layout
 *
 * @package wp-indigo
 */

get_header();
?>

    <main id="primary" class="c-main__content c-main__content--page">

        <?php
        while ( have_posts() ) :
            the_post();

            get_template_part( 'template-parts/content', 'single' );

        endwhile;// End of the loop.
        ?>

    </main><!-- #main -->

<?php
get_footer();

<?php

/**
 * Renders the custom Gutenberg block for Edumed rankings.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 *
 * @param array $attributes The block attributes.
 * @return string The block content.
 */

function render_cafeto_edumed_rankings_block($attributes) {

    // Extract attributes from the editor
    $post_type = isset($attributes['postType']) ? $attributes['postType'] : 'school_ranking';
    $program = isset($attributes['program']) ? $attributes['program'] : '';
    $default_open = isset($attributes['defaultOpen']) ? $attributes['defaultOpen'] : 5;
    $has_two_and_four_years = isset($attributes['hasTwoAndFourYears']) ? $attributes['hasTwoAndFourYears'] : '';
    $default_level_year = isset($attributes['defaultLevelYear']) ? $attributes['defaultLevelYear'] : '';
    $level_year_value = ($default_level_year === 'two-year') ? '2-year Schools' : '4-year Schools';
    $version = isset($attributes['version']) ? $attributes['version'] : ''; // Gutenberg version field

    // Define methodology texts
    $methodology_texts = array(
        '1' => '
            <h4 class="rankings-popup--widget--title">Base Methodology for EduMed&rsquo;s &ldquo;Best Online College Rankings&rdquo; for the &lsquo;24-&rsquo;25 school year.</h4>

            <p class="rankings-popup--widget--subtitle">One: Create a list of eligible schools & programs</p>

            <p>To be eligible for ranking, schools were required to meet the following criteria based on data pulled from The Integrated Postsecondary Education Data System (IPEDS), which was self-reported by the schools themselves.</p>

            <ul>
                <li>Institutional accreditation from an organization recognized by the U.S. Department of Education</li>
                <li>At least one online component in a program within the ranking-subject area.</li>
                <li>The existence of academic counseling on campus and/or online.</li>
                <li>The existence of career placement services on campus and/or online.</li>
            </ul>

            <p class="rankings-popup--widget--subtitle">Two: Assign weightings to eligible schools & programs</p>

            <p>After creating the list of eligible schools, EduMed data scientists assigned weights and ranked schools based on a mix of metrics, which were all self-reported by the school themselves to the U.S. Department of Education and IPEDS.</p>

            <p>The metrics are listed below in order of most- to least-heavily weighted.</p>

            <ul>
                <li><strong>Online Programs –&nbsp;</strong>Number of online programs, either partially- or fully-online, in the relevant subject area. Because exact numbers change often and can be difficult to verify, we use a range-based scoring system to represent this category with laptop icons.</li>
                <li><strong>% in Online Ed. –&nbsp;</strong>Percent of total students taking at least one distance education class.</li>
                <li><strong>Tuition –&nbsp;</strong>Average in-state tuition for undergraduate students studying full-time, as self-reported by the school.</li>
                <li><strong>% Receiving Award –&nbsp;</strong>Percent of full-time, first-time students receiving an award in 6 years.</li>
                <li><strong>Avg. Inst. Aid –&nbsp;</strong>Average amount of institutional grant aid awarded to full-time, first-time undergraduates.</li>
                <li><strong>Student/Faculty Ratio –&nbsp;</strong>The number of students per faculty member.</li>
                <li><strong>Student/Faculty Ratio</strong></li>
            </ul>

            <p class="rankings-popup--widget--subtitle">About Our Data</p>

            <p>EduMed’s rankings use the latest official data available from <a href="https://nces.ed.gov/ipeds/" target="_blank" rel="nofollow" aria-label=" (opens in a new tab)">The Integrated Postsecondary Education Data System</a> (IPEDS). Most recent data pull: July 2024</p>',
        '2' => '
            <h4 class="rankings-popup--widget--title">Base Methodology for EduMed&rsquo;s &ldquo;Best Online Graduate Rankings&rdquo; for the &rsquo;24-&rsquo;25 school year.</h4>

            <p class="rankings-popup--widget--subtitle">One: Create a list of eligible schools & programs</p>

            <p>To be eligible for ranking, schools were required to meet the following criteria based on data pulled from The Integrated Postsecondary Education Data System (IPEDS), which was self-reported by the schools themselves.</p>

            <ul>
                <li>Institutional accreditation from an organization recognized by the U.S. Department of Education</li>
                <li>At least one online component in a program within the ranking-subject area.</li>
                <li>The existence of academic counseling on campus and/or online.</li>
                <li>The existence of career placement services on campus and/or online.</li>
            </ul>

            <p class="rankings-popup--widget--subtitle">Two: Assign weightings to eligible schools & programs</p>

            <p>After creating the list of eligible schools, EduMed data scientists assigned weights and ranked schools based on a mix of metrics, which were all self-reported by the school themselves to the U.S. Department of Education and IPEDS.</p>

            <p>The metrics are listed below in order of most- to least-heavily weighted.</p>

            <ul>
                <li><strong>Online Programs –&nbsp;</strong>Number of online programs, either partially- or fully-online, in the relevant subject area. Because exact numbers change often and can be difficult to verify, we use a range-based scoring system to represent this category with laptop icons.</li>
                <li><strong>% in Online Ed. –&nbsp;</strong>Percent of graduate students taking at least one distance education class.</li>
                <li><strong>Tuition –&nbsp;</strong>Average in-state tuition for graduate students studying full-time, as self-reported by the school.</li>
                <li><strong>Student/Faculty Ratio –&nbsp;</strong>The number of students per faculty member.</li>
            </ul>

            <p class="rankings-popup--widget--subtitle">About Our Data</p>
            
            <p>EduMed’s rankings use the latest official data available from <a href="https://nces.ed.gov/ipeds/" target="_blank" rel="nofollow" aria-label=" (opens in a new tab)">The Integrated Postsecondary Education Data System</a> (IPEDS). Most recent data pull: July 2024</p>',
        '3' => '
            <h4 class="rankings-popup--widget--title">Base Methodology for EduMed&rsquo;s &ldquo;Most Affordable Online College Rankings&rdquo; for the &lsquo;24-&rsquo;25 school year.</h4>

            <p class="rankings-popup--widget--subtitle">One: Create a list of eligible schools & programs</p>

            <p>To be eligible for ranking, schools were required to meet the following criteria based on data pulled from The Integrated Postsecondary Education Data System (IPEDS), which was self-reported by the schools themselves.</p>

            <ul>
                <li>Institutional accreditation from an organization recognized by the U.S. Department of Education</li>
                <li>At least one online component in a program within the ranking-subject area.</li>
                <li>The existence of academic counseling on campus and/or online.</li>
                <li>The existence of career placement services on campus and/or online.</li>
            </ul>

            <p class="rankings-popup--widget--subtitle">Two: Assign weightings to eligible schools & programs</p>

            <p>After creating the list of eligible schools, EduMed data scientists assigned weights and ranked schools based on a mix of metrics, which were all self-reported by the school themselves to the U.S. Department of Education and IPEDS.</p>

            <p>The metrics are listed below in order of most- to least-heavily weighted.</p>

            <ul>
                <li><strong>Tuition –&nbsp;</strong>Average in-state tuition for undergraduate students studying full-time, as self-reported by the school.</li>
                <li><strong>Avg. Inst. Aid –&nbsp;</strong>Average amount of institutional grant aid awarded to full-time, first-time undergraduates.</li>
                <li><strong>Online Programs –&nbsp;</strong>Number of online programs, either partially- or fully-online, in the relevant subject area. Because exact numbers change often and can be difficult to verify, we use a range-based scoring system to represent this category with laptop icons.</li>
                <li><strong>% Receiving Award –&nbsp;</strong>Percent of full-time, first-time students receiving an award in 6 years.</li>
                <li><strong>% in Online Ed. –&nbsp;</strong>Percent of total students taking at least one distance education class.</li>
                <li><strong>Student/Faculty Ratio –&nbsp;</strong>The number of students per faculty member.</li>
            </ul>

            <p class="rankings-popup--widget--subtitle">About Our Data</p>
            
            <p>EduMed’s rankings use the latest official data available from <a href="https://nces.ed.gov/ipeds/" target="_blank" rel="nofollow" aria-label=" (opens in a new tab)">The Integrated Postsecondary Education Data System</a> (IPEDS). Most recent data pull: July 2024</p>',
        '4' => '
            <h4 class="rankings-popup--widget--title">Base Methodology for EduMed&rsquo;s &ldquo;Most Affordable Online Graduate Rankings&rdquo; for the &rsquo;24-&rsquo;25 school year.</h4>

            <p class="rankings-popup--widget--subtitle">One: Create a list of eligible schools & programs</p>

            <p>To be eligible for ranking, schools were required to meet the following criteria based on data pulled from The Integrated Postsecondary Education Data System (IPEDS), which was self-reported by the schools themselves.</p>

            <ul>
                <li>Institutional accreditation from an organization recognized by the U.S. Department of Education</li>
                <li>At least one online component in a program within the ranking-subject area.</li>
                <li>The existence of academic counseling on campus and/or online.</li>
                <li>The existence of career placement services on campus and/or online.</li>
            </ul>

            <p class="rankings-popup--widget--subtitle">Two: Assign weightings to eligible schools & programs</p>

            <p>After creating the list of eligible schools, EduMed data scientists assigned weights and ranked schools based on a mix of metrics, which were all self-reported by the school themselves to the U.S. Department of Education and IPEDS.</p>

            <p>The metrics are listed below in order of most- to least-heavily weighted.</p>

            <ul>
                <li><strong>Tuition –&nbsp;</strong>Average in-state tuition for graduate students studying full-time, as self-reported by the school.</li>
                <li><strong>Online Programs –&nbsp;</strong>Number of online programs, either partially- or fully-online, in the relevant subject area. Because exact numbers change often and can be difficult to verify, we use a range-based scoring system to represent this category with laptop icons.</li>
                <li><strong>% in Online Ed. –&nbsp;</strong>Percent of graduate students taking at least one distance education class.</li>
                <li><strong>Student/Faculty Ratio –&nbsp;</strong>The number of students per faculty member.</li>
            </ul>

            <p class="rankings-popup--widget--subtitle">About Our Data</p>
            
            <p>EduMed’s rankings use the latest official data available from <a href="https://nces.ed.gov/ipeds/" target="_blank" rel="nofollow" aria-label=" (opens in a new tab)">The Integrated Postsecondary Education Data System</a> (IPEDS). Most recent data pull: July 2024</p>',
    );

    // Set agruments for query
    $rankings_args = array(
        'post_type'           => $post_type,
        'post_status'         => 'publish',
        'orderby'             => 'menu_order',
        'order'               => 'ASC',
        'posts_per_page'      => -1,
        'meta_query'          => array(
            'relation' => 'AND',
            array(
                'key'     => 'year',
                'value'   => $level_year_value,
                'compare' => '='
            ),
            array(
                'key'     => 'version_acf',
                'value'   => $version, // ACF version field
                'compare' => '='
            ),
        ),
        'tax_query'           => array(
            array(
                'taxonomy' => 'school_ranking_category',
                'field'    => 'name',
                'terms'    => $program,
            ),
        ),
    );

    $rankings_query = new WP_Query($rankings_args);
    $posts = array();

    if ($rankings_query->have_posts()) {
        while ($rankings_query->have_posts()) {
            $rankings_query->the_post();
            
            // Retrieve ACF fields and menu order
            $year = get_field('year');
            $actual_program = get_field('actual_program');
            $version_acf = get_field('version_acf'); // ACF version field
            $city_location_of_institution = get_field('city_location_of_institution');
            $state_abbreviation = get_field('state_abbreviation');
            $web_address = get_field('web_address');
            $online_programs = get_field('online_programs');
            $control_of_institution = get_field('control_of_institution');
            $accreditation = get_field('accreditation');
            $avg_inst_aid = get_field('avg_inst_aid');
            $percentage_in_online_ed = get_field('percentage_in_online_ed');
            $percentage_receiving_award = get_field('percentage_receiving_award');
            $tuition_gutenberg = get_field('tuition_gutenberg');
            $studentfaculty_ratio = get_field('studentfaculty_ratio');
            $asset_url = get_field('asset_url');
            $methodology_text_option = get_field('methodology_text'); // ACF field for methodology text option

            // Compare Gutenberg "version" attribute with ACF "version" field
            if ($version_acf === $version) {
                $posts[] = array(
                    'ID' => get_the_ID(),
                    'title' => get_the_title(),
                    'content' => get_the_content(),
                    'order' => $order,
                    'acf_fields' => array(
                        'year' => $year,
                        'actual_program' => $actual_program,
                        'version' => $version_acf, // ACF version field
                        'city_location_of_institution' => $city_location_of_institution,
                        'state_abbreviation' => $state_abbreviation,
                        'web_address' => $web_address,
                        'online_programs' => $online_programs,
                        'control_of_institution' => $control_of_institution,
                        'accreditation' => $accreditation,
                        'avg_inst_aid' => $avg_inst_aid,
                        'percentage_in_online_ed' => $percentage_in_online_ed,
                        'percentage_receiving_award' => $percentage_receiving_award,
                        'tuition_gutenberg' => $tuition_gutenberg,
                        'studentfaculty_ratio' => $studentfaculty_ratio,
                        'asset_url' => $asset_url,
                        'methodology_text_option' => $methodology_text_option, // Include methodology text option
                    ),
                );
            }
        }
    }
    
    wp_reset_postdata();
    
    // Render the block with the attributes and posts
    ob_start();

    ?>

    <?php $level_year_id = $default_level_year === 'two-year' ? 'two-year-rankings' : 'four-year-rankings'; ?>
    <div class="cafeto-edumed-rankings-block" data-level-year="<?php echo esc_attr($default_level_year); ?>" data-has-years="<?php echo esc_attr($has_two_and_four_years); ?>" data-default-open="<?php echo esc_attr($default_open); ?>" id="<?php echo esc_attr($level_year_id); ?>">

        <section class="rankings-top-bar">
            <div class="rankings-top-bar--years">
                <a href="#two-year-rankings" class="two-year-button"><?php esc_html_e('2-year Schools', 'text-domain'); ?></a>
                <a href="#four-year-rankings" class="four-year-button"><?php esc_html_e('4-year Schools', 'text-domain'); ?></a>
            </div>
            <button class="rankings-top-bar--about"><?php esc_html_e('About the Rankings', 'text-domain'); ?></button>
            <div class="rankings-top-bar--expand-collapse">
                <button class="expand-all"><?php esc_html_e('Expand All', 'text-domain'); ?></button>
                <button class="collapse-all"><?php esc_html_e('Collapse All', 'text-domain'); ?></button>
            </div>
        </section>
        
        <section class="rankings-list">
            <?php if (!empty($posts)) : ?>
                <?php foreach ($posts as $post) : 
                    $order = get_post_field('menu_order', $post['ID']); ?>

                    <div class="rankings-list--item">

                        <!-- Heading -->
                        <div class="rankings-list--item--heading">
                            <div class="rankings-list--item--heading--left">
                                <span class="rankings-list--item--heading--left--rank"><?php echo esc_html($order); ?></span>
                                <div class="rankings-list--item--heading--left--title">
                                    <h4><a href="<?php echo esc_url($post['acf_fields']['web_address']); ?>" target="_blank" rel="nofollow"><?php echo esc_html($post['title']); ?></a></h4>
                                    <p><?php echo esc_html($post['acf_fields']['city_location_of_institution']) . ', ' . esc_html($post['acf_fields']['state_abbreviation']); ?>
                                    </p>
                                </div>
                                <span class="rankings-list--item--heading--left--button"></span>
                            </div>

                            <div class="rankings-list--item--heading--right">
                                <p>
                                <?php
                                $svg_icon = '<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5091 10.2439H16.6909V1.87805C16.6909 1.37996 16.5013 0.90227 16.1637 0.550068C15.8261 0.197865 15.3683 0 14.8909 0H3.10909C2.6317 0 2.17386 0.197865 1.8363 0.550068C1.49873 0.90227 1.30909 1.37996 1.30909 1.87805V10.2439H0.490909C0.360712 10.2439 0.235847 10.2979 0.143784 10.3939C0.0517206 10.49 0 10.6203 0 10.7561V12.122C0 12.62 0.189642 13.0977 0.527208 13.4499C0.864773 13.8021 1.32261 14 1.8 14H16.2C16.6774 14 17.1352 13.8021 17.4728 13.4499C17.8104 13.0977 18 12.62 18 12.122V10.7561C18 10.6203 17.9483 10.49 17.8562 10.3939C17.7642 10.2979 17.6393 10.2439 17.5091 10.2439ZM2.29091 1.87805C2.29091 1.65164 2.37711 1.43451 2.53055 1.27442C2.68399 1.11433 2.8921 1.02439 3.10909 1.02439H14.8909C15.1079 1.02439 15.316 1.11433 15.4695 1.27442C15.6229 1.43451 15.7091 1.65164 15.7091 1.87805V10.2439H2.29091V1.87805ZM17.0182 12.122C17.0182 12.3484 16.932 12.5655 16.7785 12.7256C16.6251 12.8857 16.417 12.9756 16.2 12.9756H1.8C1.583 12.9756 1.3749 12.8857 1.22146 12.7256C1.06802 12.5655 0.981818 12.3484 0.981818 12.122V11.2683H17.0182V12.122ZM10.8 3.2439C10.8 3.37975 10.7483 3.51002 10.6562 3.60608C10.5642 3.70213 10.4393 3.7561 10.3091 3.7561H7.69091C7.56071 3.7561 7.43585 3.70213 7.34378 3.60608C7.25172 3.51002 7.2 3.37975 7.2 3.2439C7.2 3.10806 7.25172 2.97778 7.34378 2.88173C7.43585 2.78567 7.56071 2.73171 7.69091 2.73171H10.3091C10.4393 2.73171 10.5642 2.78567 10.6562 2.88173C10.7483 2.97778 10.8 3.10806 10.8 3.2439Z" fill="#6D57C3"/>
                                </svg>'; 

                                // Get the number from the ACF field
                                $number_of_icons = intval($post['acf_fields']['online_programs']);

                                // Print the SVG icon the number of times specified
                                if ($number_of_icons > 0) {
                                    for ($i = 0; $i < $number_of_icons; $i++) {
                                        echo $svg_icon;
                                    }
                                }
                                ?>
                                </p>
                                <p><?php echo esc_html($post['acf_fields']['control_of_institution']); ?></p>
                                <span class="rankings-list--item--heading--right--button"></span>
                            </div>
                        </div>

                        <div class="rankings-list--item--hidden hidden">
                            
                            <!-- Content -->
                            <?php if (!empty($post['content'])): ?>
                            <div class="rankings-list--item--content">
                                <?php echo wp_kses_post($post['content']); ?>
                            </div>
                            <?php endif; ?>

                            <!-- Data -->
                            <?php if (!empty($post['acf_fields'])): ?>
                            <div class="rankings-list--item--data">
                                <ul>
                                    <?php if (!empty($post['acf_fields']['accreditation'])): ?>
                                    <li>
                                        <span><?php echo esc_html__('Accreditation', 'text-domain'); ?></span>
                                        <?php echo esc_html($post['acf_fields']['accreditation']); ?>
                                    </li>
                                    <?php endif; ?>
                                    
                                    <?php if (!empty($post['acf_fields']['avg_inst_aid'])): ?>
                                    <li>
                                        <span><?php echo esc_html__('Avg. Inst. Aid', 'text-domain'); ?></span>
                                        <?php echo esc_html($post['acf_fields']['avg_inst_aid']); ?>
                                    </li>
                                    <?php endif; ?>

                                    <?php if (!empty($post['acf_fields']['percentage_in_online_ed'])): ?>
                                    <li>
                                        <span><?php echo esc_html__('% in Online Ed.', 'text-domain'); ?></span>
                                        <?php echo esc_html($post['acf_fields']['percentage_in_online_ed']); ?>
                                    </li>
                                    <?php endif; ?>

                                    <?php if (!empty($post['acf_fields']['percentage_receiving_award'])): ?>
                                    <li>
                                        <span><?php echo esc_html__('% Receiving Award', 'text-domain'); ?></span>
                                        <?php echo esc_html($post['acf_fields']['percentage_receiving_award']); ?>
                                    </li>
                                    <?php endif; ?>

                                    <?php if (!empty($post['acf_fields']['tuition_gutenberg'])): ?>
                                    <li>
                                        <span><?php echo esc_html__('Tuition', 'text-domain'); ?></span>
                                        <?php echo esc_html($post['acf_fields']['tuition_gutenberg']); ?>
                                    </li>
                                    <?php endif; ?>

                                    <?php if (!empty($post['acf_fields']['studentfaculty_ratio'])): ?>
                                    <li>
                                        <span><?php echo esc_html__('Student/Faculty Ratio', 'text-domain'); ?></span>
                                        <?php echo esc_html($post['acf_fields']['studentfaculty_ratio']); ?>
                                    </li>
                                    <?php endif; ?>
                                </ul>

                            </div>
                            <?php endif; ?>

                        </div>

                    </div>
                <?php endforeach; ?>
            <?php else : ?>
                <p><?php esc_html_e('No rankings found.', 'text-domain'); ?></p>
            <?php endif; ?>
        </section>

        <section class="rankings-popup">
            <div class="rankings-popup--widget rankings-popup--2024 hidden">
                <span class="rankings-popup--widget--close">X</span>
                <?php 
                if (!empty($posts)) {
                    foreach ($posts as $post) {
                        $methodology_text_option = $post['acf_fields']['methodology_text_option'];
                        echo isset($methodology_texts[$methodology_text_option]) ? $methodology_texts[$methodology_text_option] : '';
                    }
                }
                ?>
            </div>
            <div class="rankings-popup--overlay hidden"></div>
        </section>
    </div>

    <?php
    return ob_get_clean();
    
}
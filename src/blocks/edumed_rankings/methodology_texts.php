<?php
/**
 * Returns the methodology text based on the provided option.
 *
 * @param string $methodology_text_option The option for the methodology text.
 * @return string The methodology text.
 */
function edumed_get_methodology_text($methodology_text_option) {
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
            <p>EduMed’s rankings use the latest official data available from <a href="https://nces.ed.gov/ipeds/" target="_blank" rel="nofollow" aria-label=" (opens in a new tab)">The Integrated Postsecondary Education Data System</a> (IPEDS). Most recent data pull: July 2024</p>'
    );

    return isset($methodology_texts[$methodology_text_option]) ? $methodology_texts[$methodology_text_option] : '';
}
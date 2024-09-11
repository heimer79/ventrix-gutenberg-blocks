<?php

/**
 * Returns the methodology text based on the provided option.
 *
 * @param string $methodology_text_option The option for the methodology text.
 * @return string The methodology text.
 */
function psd_get_methodology_text($methodology_text_option) {
    $methodology_texts = array(
        '1' => '
            <h4 class="rankings-popup--widget--title">Base Methodology for STEP&rsquo;s &ldquo;Best Online Undergraduate Rankings&rdquo;</h4>
            <p class="rankings-popup--widget--subtitle">Generate List of Eligible Schools and Programs</p>
            <p>To be eligible for this ranking, schools were required to meet the following criteria based on government data provided by The Integrated Postsecondary Education Data System (IPEDS).</p>
            <ul>
                <li>Institutional accreditation from an organization recognized by the U.S. Department of Education.</li>
                <li>At least one program in the subject area offered partially or fully online.</li>
                <li>Career placement and academic counseling services.</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">Assign Weightings</p>
            <p>After generating the list of eligible schools, the STEPS data team then assigned weights and ranked schools based on their performance in a variety of key categories. Online learning metrics received the heaviest weightings, followed by affordability and student outcomes/academic quality metrics.</p>
            <p>Online Learning</p>
            <ul>
                <li>Number of online programs</li>
                <li>Percent of undergraduate students enrolled exclusively in distance education courses</li>
                <li>Percent of undergraduate students enrolled in some but not all distance education courses</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">Affordability</p>
            <ul>
                <li>Average amount of institutional grant aid awarded to full-time, first-time undergraduate students</li>
                <li>Tuition and fess</li>
            </ul>
            <p>Student Outcomes</p>
            <ul>
                <li>Full-time retention rate</li>
                <li>Student-to-faculty ratio</li>
                <li>Graduation rate</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">About Our Data</p>
            <p>All STEPS rankings use the latest official data available from <a href="https://nces.ed.gov/ipeds/" target="_blank" rel="nofollow" aria-label=" (opens in a new tab)">The Integrated Postsecondary Education Data System (IPEDS)</a>. Most recent data pull: August 2024.</p>',
        '2' => '
            <h4 class="rankings-popup--widget--title">Base Methodology for STEP&rsquo;s &ldquo;Best Online Graduate Rankings&rdquo;</h4>
            <p class="rankings-popup--widget--subtitle">Generate List of Eligible Schools and Programs</p>
            <p>To be eligible for this ranking, schools were required to meet the following criteria based on government data provided by The Integrated Postsecondary Education Data System (IPEDS).&nbsp;</p>
            <ul>
                <li>Institutional accreditation from an organization recognized by the U.S. Department of Education.</li>
                <li>At least one program in the subject area offered partially or fully online.</li>
                <li>Career placement and academic counseling services.</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">Assign Weightings</p>
            <p>After generating the list of eligible schools, the STEPS data team then assigned weights and ranked schools based on their performance in a variety of key categories. Online learning metrics received the heaviest weightings, followed by affordability and student outcomes/academic quality metrics.</p>
            <p><strong>Online Learning</strong></p>
            <ul>
                <li>Number of online programs</li>
                <li>Percent of graduate students enrolled exclusively in distance education courses</li>
                <li>Percent of graduate students enrolled in some but not all distance education courses</li>
            </ul>
            <p><strong>Affordability</strong></p>
            <ul>
                <li>Average amount of federal, state, local, or institutional grant aid awarded</li>
                <li>Tuition and fess</li>
            </ul>
            <p><strong>Student Outcomes</strong></p>
            <ul>
                <li>Full-time retention rate</li>
                <li>Student-to-faculty ratio</li>
                <li>Graduation rate</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">About Our Data</p>
            <p>All STEPS rankings use the latest official data available from <a href="https://nces.ed.gov/ipeds/" target="_blank" rel="nofollow" aria-label=" (opens in a new tab)">The Integrated Postsecondary Education Data System (IPEDS)</a>. Most recent data pull: August 2024</p>',
        '3' => '
            <h4 class="rankings-popup--widget--title">Base Methodology for STEP&rsquo;s &ldquo;Most Affordable Online Undergraduate Rankings&rdquo;</h4>
            <p class="rankings-popup--widget--subtitle">Generate List of Eligible Schools and Programs</p>
            <p>To be eligible for this ranking, schools were required to meet the following criteria based on government data provided by The Integrated Postsecondary Education Data System (IPEDS).</p>
            <ul>
                <li>Institutional accreditation from an organization recognized by the U.S. Department of Education.</li>
                <li>At least one program in the subject area offered partially or fully online.</li>
                <li>Career placement and academic counseling services.</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">Assign Weightings</p>
            <p>After generating the list of eligible schools, the STEPS data team then assigned weights and ranked schools based on their performance in a variety of key categories. Affordability metrics received the heaviest weightings, followed by online learning and student outcomes/academic quality metrics.</p>
            <p><strong>Affordability</strong></p>
            <ul>
                <li>Average amount of institutional grant aid awarded to full-time, first-time undergraduate students</li>
                <li>Tuition and fess</li>
            </ul>
            <p><strong>Online Learning</strong></p>
            <ul>
                <li>Number of online programs</li>
                <li>Percent of undergraduate students enrolled exclusively in distance education courses</li>
                <li>Percent of undergraduate students enrolled in some but not all distance education courses</li>
            </ul>
            <p><strong>Student Outcomes</strong></p>
            <ul>
                <li>Full-time retention rate</li>
                <li>Student-to-faculty ratio</li>
                <li>Graduation rate</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">About Our Data</p>
            <p>All STEPS rankings use the latest official data available from <a href="https://nces.ed.gov/ipeds/" target="_blank" rel="nofollow" aria-label=" (opens in a new tab)">The Integrated Postsecondary Education Data System (IPEDS)</a>. Most recent data pull: August 2024.</p>',
        '4' => '       
            <h4 class="rankings-popup--widget--title">Base Methodology for STEP&rsquo;s &ldquo;Most Affordable Online Graduate Rankings&rdquo;</h4>
            <p class="rankings-popup--widget--subtitle">Generate List of Eligible Schools and Programs</p>
            <p>To be eligible for this ranking, schools were required to meet the following criteria based on government data provided by The Integrated Postsecondary Education Data System (IPEDS).</p>
            <ul>
                <li>Institutional accreditation from an organization recognized by the U.S. Department of Education.</li>
                <li>At least one program in the subject area offered partially or fully online.</li>
                <li>Career placement and academic counseling services.</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">Assign Weightings</p>
            <p>After generating the list of eligible schools, the STEPS data team then assigned weights and ranked schools based on their performance in a variety of key categories. Affordability metrics received the heaviest weightings, followed by online learning and student outcomes/academic quality metrics.</p>
            <p><strong>Affordability</strong></p>
            <ul>
                <li>Average amount of federal, state, local, or institutional grant iad awarded</li>
                <li>Tuition and fess</li>
            </ul>
            <p><strong>Online Learning</strong></p>
            <ul>
                <li>Number of online programs</li>
                <li>Percent of graduate students enrolled exclusively in distance education courses</li>
                <li>Percent of graduate students enrolled in some but not all distance education courses</li>
            </ul>
            <p><strong>Student Outcomes</strong></p>
            <ul>
                <li>Full-time retention rate</li>
                <li>Student-to-faculty ratio</li>
                <li>Graduation rate</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">About Our Data</p>
            <p>All STEPS rankings use the latest official data available from <a href="https://nces.ed.gov/ipeds/" target="_blank" rel="nofollow" aria-label=" (opens in a new tab)">The Integrated Postsecondary Education Data System (IPEDS)</a>. Most recent data pull: August 2024.</p>',
        '5' => '       
            <h4 class="rankings-popup--widget--title">Base Methodology for STEP&rsquo;s &ldquo;Best Online College Rankings&rdquo;</h4>
            <p class="rankings-popup--widget--subtitle">Generate List of Eligible Schools and Programs</p>
            <p>To be eligible for this ranking, schools were required to meet the following criteria based on government data provided by The Integrated Postsecondary Education Data System (IPEDS).</p>
            <ul>
                <li>Institutional accreditation from an organization recognized by the U.S. Department of Education.</li>
                <li>At least one program in the subject area offered partially or fully online.</li>
                <li>Career placement and academic counseling services.</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">Assign Weightings</p>
            <p>After generating the list of eligible schools, the STEPS data team then assigned weights and ranked schools based on their performance in a variety of key categories. Online learning metrics received the heaviest weightings, followed by affordability and student outcomes/academic quality metrics.</p>
            <p><strong>Online Learning</strong></p>
            <ul>
                <li>Number of online programs</li>
                <li>Percent of total students enrolled exclusively in distance education courses</li>
                <li>Percent of total students enrolled in some but not all distance education courses</li>
            </ul>
            <p><strong>Affordability</strong></p>
            <ul>
                <li>Average amount of federal, state, local, or institutional grant aid awarded</li>
                <li>Tuition and fess</li>
            </ul>
            <p><strong>Student Outcomes</strong></p>
            <ul>
                <li>Full-time retention rate</li>
                <li>Student-to-faculty ratio</li>
                <li>Graduation rate</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">About Our Data</p>
            <p>All STEPS rankings use the latest official data available from <a href="https://nces.ed.gov/ipeds/" target="_blank" rel="nofollow" aria-label=" (opens in a new tab)">The Integrated Postsecondary Education Data System (IPEDS)</a>. Most recent data pull: August 2024.</p>',
        '6' => '
            <h4 class="rankings-popup--widget--title">Base Methodology for STEP&rsquo;s &ldquo;Most Affordable Online College Rankings&rdquo;</h4>
            <p class="rankings-popup--widget--subtitle">Generate List of Eligible Schools and Programs</p>
            <p>To be eligible for this ranking, schools were required to meet the following criteria based on government data provided by The Integrated Postsecondary Education Data System (IPEDS).</p>
            <ul>
                <li>Institutional accreditation from an organization recognized by the U.S. Department of Education.</li>
                <li>At least one program in the subject area offered partially or fully online.</li>
                <li>Career placement and academic counseling services.</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">Assign Weightings</p>
            <p>After generating the list of eligible schools, the STEPS data team then assigned weights and ranked schools based on their performance in a variety of key categories. Affordability metrics received the heaviest weightings, followed by online learning and student outcomes/academic quality metrics.</p>
            <p><strong>Affordability</strong></p>
            <ul>
                <li>Average amount of federal, state, local, or institutional grant aid awarded</li>
                <li>Tuition and fess</li>
            </ul>
            <p><strong>Online Learning</strong></p>
            <ul>
                <li>Number of online programs</li>
                <li>Percent of total students enrolled exclusively in distance education courses</li>
                <li>Percent of total students enrolled in some but not all distance education courses</li>
            </ul>
            <p><strong>Student Outcomes</strong></p>
            <ul>
                <li>Full-time retention rate</li>
                <li>Student-to-faculty ratio</li>
                <li>Graduation rate</li>
            </ul>
            <p class="rankings-popup--widget--subtitle">About Our Data</p>
            <p>All STEPS rankings use the latest official data available from <a href="https://nces.ed.gov/ipeds/" target="_blank" rel="nofollow" aria-label=" (opens in a new tab)">The Integrated Postsecondary Education Data System (IPEDS)</a>. Most recent data pull: August 2024.</p>'   
    );

    return isset($methodology_texts[$methodology_text_option]) ? $methodology_texts[$methodology_text_option] : '';
}

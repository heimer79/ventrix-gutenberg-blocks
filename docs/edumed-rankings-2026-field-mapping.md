# EduMed Rankings 2026–2027 — field mapping

Reference for importing `school_ranking` posts (WP Sheet Editor, spreadsheets) and for which fields Rankings 2026 actually prints.

| | |
|---|---|
| CPT | `school_ranking` |
| ACF group | `group_ranking_2026` (admin title: **Rankings 2026-2027**) |
| Block design | `ranking_2026` |
| Field PHP | `src/includes/acf_fields/edumed/ranking-2026.php` |
| Render PHP | `src/blocks/edumed_rankings/inc/rankings-2026.php` |
| Page settings | `src/includes/acf_fields/edumed/ranking-settings.php` (on the **page**, not the school post) |

Runtime PHP is loaded from `build/`. After changing ACF or render files, run `npm run build` from the plugin root.

In WP Sheet Editor, search **`2027 |`**. Enable missing columns under Sheet Editor → Columns. Map by ACF **name** (meta key), not the old leftover labels.

---

## Why some columns did not pick up the prefix

WP Sheet Editor shows **one column per meta key**. Older field groups on this CPT already own names like `web_address`, `school_type`, `version`, `unitid`, and `studentfaculty_ratio`. Relabeling those same names in PHP does not create a new column — you still see **Web address**, **school type OLD**, **Version**, etc.

This cohort uses **unique names** for those collisions:

| Spreadsheet | Do **not** map to (old) | Map to (2027) | Label |
|---|---|---|---|
| Website | `web_address` (Web address) | `website` | 2027 \| Website |
| School Type | `school_type` (school type OLD) | `school_type_2027` | 2027 \| School Type |
| Version | `version` / `version_acf` | `version_2027` | 2027 \| Version |
| unitid | `unitid` | `unitid_2027` | 2027 \| unitid |
| student faculty ratio | `studentfaculty_ratio` | `studentfaculty_ratio_2027` | 2027 \| Student/Faculty Ratio |
| Program URL | `online_program_url` / `new_program_url` | `program_url` | 2027 \| Program URL (title link) |

**New Program URL** is not in this group. Do not use it.

The front end still falls back to the old keys if the 2027 field is empty.

---

## Year prefix

Every field in this group is labeled `2027 | …` so you can filter the current schema. Unique **names** are only used where an older column already occupies that meta key.

On the ranking **page**, set Version to **2027** to match what you import into `version_2027`.

---

## Spreadsheet → ACF

| Spreadsheet heading | ACF name | ACF label | Rankings 2026 front end |
|---|---|---|---|
| Ranking Type | `ranking_type` | 2027 \| Ranking Type | Header pills. Store `BestUndergraduate`, `BestGraduate`, `AffordableUndergraduate`, or `AffordableGraduate`. |
| Program URL | `program_url` | 2027 \| Program URL (title link) | Link on the school **title**. |
| Website | `website` | 2027 \| Website | Stored only. Title does **not** use this. |
| School Level | `school_level` | 2027 \| School Level | Stored only. |
| School Type | `school_type_2027` | 2027 \| School Type | Program Details (e.g. Public, Private). |
| Version | `version_2027` | 2027 \| Version | Query filter. Must match the page Version. |
| unitid | `unitid_2027` | 2027 \| unitid | Stored only. |
| PMASTR | `pmastr` | 2027 \| PMASTR | Stored only. |
| PTOTAL | `ptotal` | 2027 \| PTOTAL | Stored only. |
| student faculty ratio | `studentfaculty_ratio_2027` | 2027 \| Student/Faculty Ratio | Program Details. |
| City | `city` | 2027 \| City | Location in Program Details. |
| State | `state` | 2027 \| State | Location in Program Details. |
| Counseling | `academiccareer_counseling_service` | 2027 \| Counseling Services | Program Details. |
| Percent of undergraduate students awarded grant aid | `students_w_aid` | 2027 \| Students w/ Aid | Header and/or Program Details. |
| Average amount of grant aid awarded to undergraduate students | `avg_aid_amount` | 2027 \| Avg. Aid Amount | Program Details. |
| online undergrad enroll / online enrollment | `online_undergrad_enroll` | 2027 \| Online Undergrad Enroll | Shown as **Online Enrollment**. Falls back to `online_learning`. |
| avg ft tuition | `tuition` | 2027 \| Tuition | Shown as **Avg. Tuition**. |
| credit charge pt | `avg_cost_credit` | 2027 \| Avg. Cost/Credit | Header and/or Program Details. |
| alternative tuition plans | `alt_tuition_plans` | 2027 \| Alt. Tuition Plan(s) | Program Details. |
| net price | `net_price` | 2027 \| Net Price | Shown as **Avg. Net Price**. |
| Best For Tags | `best_for` | 2027 \| Best For Tags | `Best for: {value}` under the title. Hidden if empty. |
| Board-Approved Tags | `board_approved_tags` | 2027 \| Board-Approved Tags | Chip under the title. Hidden if empty. |

Do **not** import 2027 city/state into City 2025 / State 2025.

---

## WordPress fields (not ACF)

| What | Sheet Editor / WP |
|---|---|
| Institution / school name | Post **Title** |
| Body copy | Post **Content** |
| Rank number | **Order** (`menu_order`) |
| Program used to filter the list | Taxonomy `school_ranking_category` (must match the page’s Program setting) |

The list query matches `version_2027` or legacy `version` to the page Version.

---

## Ranking Type → header pills

Each school’s `ranking_type` pins two stats in the header. Remaining filled stats still print in Program Details. Empty values are skipped.

| Stored value | Also accepted | Header pills |
|---|---|---|
| `BestUndergraduate` | Best Undergraduate, `best_undergraduate` | Online Enrollment, Avg. Net Price |
| `BestGraduate` | Best Graduate, `best_graduate` | Online Enrollment, Avg. Tuition |
| `AffordableUndergraduate` | Affordable Undergraduate, `affordable_undergraduate` | Avg. Net Price, Students W/ Aid |
| `AffordableGraduate` | Affordable Graduate, `affordable_graduate` | Avg. Tuition, Avg. Cost/Credit |

Unknown or empty type falls back to **Best Undergraduate**.

Online Enrollment reads `online_undergrad_enroll`, then `online_learning`.

---

## Fields used on the Rankings 2026 front end

| Name | Label | Where it shows |
|---|---|---|
| `ranking_type` | 2027 \| Ranking Type | Which two header pills |
| `program_url` | 2027 \| Program URL (title link) | School title link (falls back to `online_program_url`) |
| `city` | 2027 \| City | Location |
| `state` | 2027 \| State | Location |
| `school_type_2027` | 2027 \| School Type | Program Details (falls back to `school_type`) |
| `academiccareer_counseling_service` | 2027 \| Counseling Services | Program Details |
| `tuition` | 2027 \| Tuition | Avg. Tuition |
| `best_for` | 2027 \| Best For Tags | Under title; hidden if empty |
| `board_approved_tags` | 2027 \| Board-Approved Tags | Under title; hidden if empty |
| `online_undergrad_enroll` | 2027 \| Online Undergrad Enroll | Online Enrollment |
| `online_learning` | 2027 \| Online Learning | Fallback for Online Enrollment |
| `net_price` | 2027 \| Net Price | Avg. Net Price |
| `avg_cost_credit` | 2027 \| Avg. Cost/Credit | Header / details |
| `alt_tuition_plans` | 2027 \| Alt. Tuition Plan(s) | Program Details |
| `studentfaculty_ratio_2027` | 2027 \| Student/Faculty Ratio | Program Details (falls back to `studentfaculty_ratio`) |
| `students_w_aid` | 2027 \| Students w/ Aid | Header / details |
| `avg_aid_amount` | 2027 \| Avg. Aid Amount | Program Details |
| `accreditation` | 2027 \| Accreditation | Program Details |
| `program_highlight_1` / `_2` / `_3` | 2027 \| Program Highlight 1–3 | “Why We Selected”; falls back to Blurb 1–3 |
| `blurb_1` / `_2` / `_3` | 2027 \| Blurb 1–3 | Fallback if highlights are empty |
| `version_2027` | 2027 \| Version | Query filter (falls back to `version`) |
| `program` | 2027 \| Program | Taxonomy on the school post |

Program Details order (header stats are omitted so they are not duplicated): Location, Accreditation, Counseling Services, School Type, Students W/ Aid, Avg. Aid Amount, Avg. Cost/Credit, Alt. Tuition Plan(s), Online Enrollment, Student/Faculty Ratio, Avg. Tuition, Avg. Net Price.

---

## Stored only (export / future use)

These save in post meta even if Rankings 2026 never prints them.

| Name | Label |
|---|---|
| `website` | 2027 \| Website |
| `school_level` | 2027 \| School Level |
| `unitid_2027` | 2027 \| unitid |
| `ptotal` | 2027 \| PTOTAL |
| `pmastr` | 2027 \| PMASTR |
| `asset_url` | 2027 \| Asset URL |
| `graduation_rate` | 2027 \| Graduation Rate |
| `methodology_text_version` | 2027 \| Methodology Text Version |
| `score` | 2027 \| Score |
| `control_of_institution_2026` | 2027 \| Control of Institution |
| `secondary_school_gpa` | 2027 \| Secondary School GPA |
| `secondary_school_rank` | 2027 \| Secondary School Rank |
| `secondary_school_record` | 2027 \| Secondary School Record |
| `recommendations` | 2027 \| Recommendations |
| `formal_demonstration_of_competencies` | 2027 \| Formal Demonstration of Competencies |
| `personal_statement_or_essay` | 2027 \| Personal Statement or Essay |
| `admission_test_scores` | 2027 \| Admission Test Scores |
| `acceptance_rate` | 2027 \| Acceptance Rate |
| `applicants_total` | 2027 \| Applicants Total |
| `admissions_total` | 2027 \| Admissions Total |
| `enrolled_total` | 2027 \| Enrolled Total |
| `percent_submitting_act_scores` | 2027 \| Percent Submitting ACT Scores |
| `percent_submitting_sat_scores` | 2027 \| Percent Submitting SAT Scores |
| `score_range` | 2027 \| Score Range |

---

## Page-level settings (not on the school post)

These live on the ranking **page** (`group_ranking_settings`):

| Name | Label | Notes |
|---|---|---|
| `post_type` | Post type | `school_ranking` or `feature_ranking` |
| `block_design` | Block Design | Use `ranking_2026` for this layout |
| `program` | Program | Taxonomy `school_ranking_category`; schools must share this term |
| `schema_list_name` | Schema List Name | JSON-LD ItemList name |
| `default_open` | Default Open | How many rows start expanded |
| `metodology_text` | Metodology Text | Methodology repeater version |
| `has_2_and_4_years` | Has 2 and 4 Years? | Used by other ranking designs |
| `default_level_year` | Default Level Year | Used by other ranking designs |
| `version` | Version | Must match each school’s `version_2027`. Use `2027` for this cohort. |

---

## Older keys (do not use for 2027 import)

| Key / label | Notes |
|---|---|
| `web_address` / Web address | Older homepage field. Use `website`. |
| `school_type` / school type OLD | Older school type. Use `school_type_2027`. |
| `version`, `version_acf` | Older year filters. Use `version_2027`. |
| `unitid` | Older unitid. Use `unitid_2027`. |
| `studentfaculty_ratio` | Older ratio. Use `studentfaculty_ratio_2027`. |
| `online_program_url`, `new_program_url` | Older program URLs. Use `program_url`. |
| `city_location_of_institution`, `state_abbreviation` | Traditional school ranking layout |
| `school_city`, `school_state` | Very old shortcode |
| City 2025 / State 2025 | Older city/state. Use `city` / `state`. |

---

## Full ACF name checklist (this group)

`program_url`, `website`, `version_2027`, `ranking_type`, `ptotal`, `pmastr`, `asset_url`, `program`, `unitid_2027`, `city`, `state`, `school_type_2027`, `school_level`, `academiccareer_counseling_service`, `tuition`, `best_for`, `board_approved_tags`, `online_undergrad_enroll`, `net_price`, `avg_cost_credit`, `alt_tuition_plans`, `online_learning`, `studentfaculty_ratio_2027`, `students_w_aid`, `avg_aid_amount`, `graduation_rate`, `accreditation`, `methodology_text_version`, `score`, `program_highlight_1`, `program_highlight_2`, `program_highlight_3`, `blurb_1`, `blurb_2`, `blurb_3`, `secondary_school_gpa`, `secondary_school_rank`, `secondary_school_record`, `recommendations`, `formal_demonstration_of_competencies`, `personal_statement_or_essay`, `admission_test_scores`, `acceptance_rate`, `applicants_total`, `admissions_total`, `enrolled_total`, `percent_submitting_act_scores`, `percent_submitting_sat_scores`, `score_range`, `control_of_institution_2026`.

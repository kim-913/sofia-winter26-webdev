Module 8 Discussion: Designing Effective and Accessible Tables

For this discussion, I looked at the Bureau of Labor Statistics (BLS) Occupational Outlook Handbook at bls.gov, which uses tables to display employment data such as median pay, job outlook percentages, and required education levels across various occupations.

The table organizes information using clearly labeled column headers (e.g., "Occupation," "Median Annual Wage," "Job Outlook") with each row representing a different job category. This structure allows users to quickly scan and compare careers side by side without reading lengthy paragraphs.

The table is generally easy to read — the headers stand out visually, and alternating row colors (zebra striping) help the eye track across each row without losing its place. However, on smaller screens, the table becomes cramped and requires horizontal scrolling, which disrupts the reading flow.

One improvement would be to add a <caption> element describing the table's purpose, along with proper scope attributes on the <th> elements. This would make the table significantly more accessible for screen reader users, ensuring they understand the context and relationship between headers and data cells before navigating the content.

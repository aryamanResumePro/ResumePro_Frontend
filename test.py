# ATS-friendly content
ats_content = """
**Name:** John Doe
**Email:** john.doe@example.com
**Phone:** 1234567890

**Education:**
- B.Sc. in Computer Science, XYZ University (Graduation Year: 2022)

**Work Experience:**
- Software Engineer, ABC Corp (2 years)
  - Developed and maintained web applications.
  - Collaborated with cross-functional teams to deliver projects on time.
  - Improved application performance by 25% through code optimization.

**Projects:**
- Project A (Jan 2023 - Mar 2023)
  - Developed a REST API using Flask.
  - Implemented user authentication using JWT.
  - Optimized database queries to improve performance by 30%.

**Achievements:**
- Won the Best Coder Award at XYZ Hackathon.
- Published a research paper on AI in IEEE Journal.
"""

# Function to parse ATS content
def parse_ats_content(content):
    data = {}
    lines = content.strip().split("\n")
    current_section = None

    for line in lines:
        if line.startswith("**"):
            # Extract section name
            section = line.strip("*").strip(":").strip().lower().replace(" ", "_")
            current_section = section
            data[section] = []
        elif line.strip() and current_section:
            # Add content to the current section
            data[current_section].append(line.strip())

    return data

# Parse the ATS content
parsed_data = parse_ats_content(ats_content)

# HTML template
html_template = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{name} - Resume</title>
  <style>
    body {{
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 20px;
      background-color: #f9f9f9;
    }}
    .resume {{
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }}
    h1 {{
      font-size: 2.5em;
      margin-bottom: 10px;
      color: #2c3e50;
    }}
    h2 {{
      font-size: 1.5em;
      margin-top: 20px;
      margin-bottom: 10px;
      color: #34495e;
      border-bottom: 2px solid #34495e;
      padding-bottom: 5px;
    }}
    .contact-info {{
      margin-bottom: 20px;
    }}
    .contact-info p {{
      margin: 5px 0;
      color: #666;
    }}
    .section {{
      margin-bottom: 20px;
    }}
    .section ul {{
      list-style-type: none;
      padding: 0;
    }}
    .section ul li {{
      margin-bottom: 10px;
    }}
    .section ul li strong {{
      display: block;
      font-size: 1.1em;
      color: #2c3e50;
    }}
    .section ul li p {{
      margin: 5px 0;
      color: #666;
    }}
    .achievements ul {{
      list-style-type: disc;
      padding-left: 20px;
    }}
    .achievements ul li {{
      margin-bottom: 5px;
    }}
  </style>
</head>
<body>
  <div class="resume">
    <h1>{name}</h1>
    <div class="contact-info">
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
    </div>

    <div class="section">
      <h2>Education</h2>
      <ul>
        {education}
      </ul>
    </div>

    <div class="section">
      <h2>Work Experience</h2>
      <ul>
        {work_experience}
      </ul>
    </div>

    <div class="section">
      <h2>Projects</h2>
      <ul>
        {projects}
      </ul>
    </div>

    <div class="section achievements">
      <h2>Achievements</h2>
      <ul>
        {achievements}
      </ul>
    </div>
  </div>
</body>
</html>
"""

# Function to format list items
def format_list_items(items):
    return "\n".join([f"<li>{item}</li>" for item in items])

# Extract data
name = parsed_data["Name"][0]
email = parsed_data["email"][0]
phone = parsed_data["phone"][0]
education = format_list_items(parsed_data["education"])
work_experience = format_list_items(parsed_data["work_experience"])
projects = format_list_items(parsed_data["projects"])
achievements = format_list_items(parsed_data["achievements"])

# Fill the template with data
html_content = html_template.format(
    name=name,
    email=email,
    phone=phone,
    education=education,
    work_experience=work_experience,
    projects=projects,
    achievements=achievements
)

# Write the HTML file
with open("resume.html", "w") as file:
    file.write(html_content)

print("Resume generated successfully as 'resume.html'.")
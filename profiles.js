document.addEventListener("DOMContentLoaded", () => {
    const resumeForm = document.getElementById("resumeForm");
    const studentSection = document.getElementById("studentSection");
    const professionalSection = document.getElementById("professionalSection");
    const internshipSection = document.getElementById("internshipSection");
    const addInternshipBtn = document.getElementById("addInternshipBtn");
    const addEducationBtn = document.getElementById("addEducationBtn");
    const addProjectBtn = document.getElementById("addProjectBtn");
    const addExperienceBtn = document.getElementById("addExperienceBtn");
    const addAchievementBtn = document.getElementById("addAchievementBtn");
    const addCertificationBtn = document.getElementById("addCertificationBtn");
    const educationFields = document.getElementById("educationFields");
    const projectFields = document.getElementById("projectFields");
    const experienceFields = document.getElementById("experienceFields");
    const achievementsFields = document.getElementById("achievementsFields");
    const certificationsFields = document.getElementById("certificationsFields");
    const internshipStatus = document.getElementById("internshipStatus");
    const initialProfileType = document.querySelector('input[name="profileType"]:checked').value;

    toggleRequiredAttributes(studentSection, initialProfileType === "student");
    toggleRequiredAttributes(professionalSection, initialProfileType === "professional");

    // Toggle between student and professional profiles
    document.querySelectorAll('.profileType').forEach(radio => {
        radio.addEventListener("change", function () {
            const isStudent = this.value === "student";

            // Show/hide sections
            studentSection.classList.toggle("hidden", !isStudent);
            professionalSection.classList.toggle("hidden", isStudent);

            // Toggle required attributes
            toggleRequiredAttributes(studentSection, isStudent);
            toggleRequiredAttributes(professionalSection, !isStudent); // Fix here

            // Hide internship section
            internshipStatus.classList.toggle("hidden", !isStudent);
            internshipSection.classList.add("hidden");
        });
    });


    // Function to toggle required attributes
    function toggleRequiredAttributes(section, isRequired) {
        const fields = section.querySelectorAll("input, textarea, select");
        fields.forEach(field => {
            if (isRequired) {
                field.setAttribute("required", true);
            } else {
                field.removeAttribute("required");
            }
        });
    }

    // Toggle between student and professional profiles
    document.querySelectorAll('.profileType').forEach(radio => {
        radio.addEventListener("change", function () {
            const isStudent = this.value === "student";

            // Show/hide sections based on profile type
            studentSection.classList.toggle("hidden", !isStudent);
            professionalSection.classList.toggle("hidden", isStudent);

            // Toggle required attributes for student and professional sections
            toggleRequiredAttributes(studentSection, isStudent);
            toggleRequiredAttributes(professionalSection, !isStudent);

            // Hide internship toggle for professionals
            internshipStatus.classList.toggle("hidden", !isStudent);
            internshipSection.classList.toggle("hidden", true); // Hide internship section by default
        });
    });

    // Toggle Internship Section Visibility
    document.querySelectorAll('.internshipToggle').forEach(radio => {
        radio.addEventListener("change", function () {
            const showInternship = this.value === "yes";

            // Show/hide internship fields and button
            internshipSection.classList.toggle("hidden", !showInternship);
            addInternshipBtn.classList.toggle("hidden", !showInternship);

            // Toggle required attributes for internship fields
            toggleRequiredAttributes(internshipSection, showInternship);
        });
    });

    // Add Education Entry
    addEducationBtn.addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("education-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">University/College</label>
                    <input type="text" name="institution[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter institution name" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Degree</label>
                    <input type="text" name="degree[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Degree obtained" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Year of Graduation</label>
                    <input type="text" name="graduationYear[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Graduation year" required>
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        educationFields.appendChild(newEntry);
    });

    // Add Project Entry
    addProjectBtn.addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("project-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Project Title</label>
                    <input type="text" name="projectTitle[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter project title" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Role</label>
                    <input type="text" name="projectRole[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Your role" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Duration</label>
                    <input type="text" name="projectDuration[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Jan 2023 - Present" required>
                </div>
                <div class="md:col-span-2 space-y-2">
                    <label class="block font-medium text-gray-700">Contribution</label>
                    <textarea name="contribution[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Describe your contribution" rows="4" required></textarea>
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        projectFields.appendChild(newEntry);
    });

    // Add Work Experience Entry
    addExperienceBtn.addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("experience-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Company</label>
                    <input type="text" name="company[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Company name" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Job Title</label>
                    <input type="text" name="jobTitle[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Job title" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Duration</label>
                    <input type="text" name="workDuration[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Jan 2020 - Present" required>
                </div>
                <div class="md:col-span-2 space-y-2">
                    <label class="block font-medium text-gray-700">Responsibilities</label>
                    <textarea name="responsibilities[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Describe your responsibilities" rows="4" required></textarea>
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        experienceFields.appendChild(newEntry);
    });

    // Add Internship Entry
    function addInternshipEntry() {
        const newEntry = document.createElement("div");
        newEntry.classList.add("internship-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Organization</label>
                    <input type="text" name="internship_organization[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter organization name" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Role</label>
                    <input type="text" name="internship_role[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter your role" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Duration</label>
                    <input type="text" name="internship_duration[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., 3 months" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Contribution</label>
                    <textarea name="internship_contribution[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Describe your contribution" rows="4" required></textarea>
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        internshipFields.appendChild(newEntry);
    }

    // Add Internship Button
    addInternshipBtn.addEventListener("click", () => {
        addInternshipEntry();
    });

    // Add Achievement Entry
    addAchievementBtn.addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("achievement-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Title</label>
                    <input type="text" name="achievementTitle[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter achievement title">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Date</label>
                    <input type="text" name="achievementDate[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Jan 2023">
                </div>
                <div class="md:col-span-2 space-y-2">
                    <label class="block font-medium text-gray-700">Description</label>
                    <textarea name="achievementDescription[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Describe the achievement" rows="4"></textarea>
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        achievementsFields.appendChild(newEntry);
    });

    // Add Certification Entry
    addCertificationBtn.addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("certification-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Title</label>
                    <input type="text" name="certificationTitle[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter certification title">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Issuer</label>
                    <input type="text" name="certificationIssuer[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Issuer (e.g., Coursera)">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Date</label>
                    <input type="text" name="certificationDate[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Jan 2023">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Certificate Number</label>
                    <input type="text" name="certificationNumber[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter certificate number">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Validity</label>
                    <input type="text" name="certificationValidity[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Lifetime, 2 years">
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        certificationsFields.appendChild(newEntry);
    });

    // Remove Entry
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-entry")) {
            const entry = e.target.closest(".education-entry, .project-entry, .experience-entry, .internship-entry, .achievement-entry, .certification-entry");
            const parent = entry.parentElement;

            // Check if the field is optional (achievements or certifications) or an extra field
            if (entry.classList.contains("achievement-entry") || entry.classList.contains("certification-entry")) {
                // Always allow removal of optional fields
                entry.remove();
            } else if (parent.children.length > 1) {
                // Allow removal of extra fields (not the default one)
                entry.remove();
            } else {
                alert("Default fields cannot be removed.");
            }
        }
    });

// Form Submission
resumeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(resumeForm);
    const formDataObj = {};

    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        if (key.endsWith('[]')) {
            const cleanKey = key.slice(0, -2);
            if (!formDataObj[cleanKey]) {
                formDataObj[cleanKey] = [];
            }
            formDataObj[cleanKey].push(value);
        } else {
            formDataObj[key] = value;
        }
    }

    // Construct final JSON object
    const finalData = {
        name: formDataObj.name,
        email: formDataObj.email,
        phone: formDataObj.phone,
        linkedin: formDataObj.linkedin, // Add LinkedIn Profile
        github: formDataObj.github, // Add GitHub Profile
        website: formDataObj.website, // Add Personal Website
        profileType: formDataObj.profileType,
        desiredRole: formDataObj.desiredRole,
        desiredCompany: formDataObj.desiredCompany,
        education: [],
        projects: [],
        internships: [],
        experience: [],
        achievements: [],
        certifications: [],
    };

    // Group education
    if (formDataObj.institution) {
        for (let i = 0; i < formDataObj.institution.length; i++) {
            finalData.education.push({
                institution: formDataObj.institution[i],
                degree: formDataObj.degree[i],
                graduationYear: formDataObj.graduationYear[i],
            });
        }
    }

    // Group projects (only for students)
    if (formDataObj.profileType === "student" && formDataObj.projectTitle) {
        for (let i = 0; i < formDataObj.projectTitle.length; i++) {
            finalData.projects.push({
                projectTitle: formDataObj.projectTitle[i],
                projectRole: formDataObj.projectRole[i],
                projectDuration: formDataObj.projectDuration[i],
                contribution: formDataObj.contribution[i],
            });
        }
    }

    // Group internships (only for students)
    if (formDataObj.profileType === "student" && formDataObj.internship === "yes" && formDataObj.internship_organization) {
        for (let i = 0; i < formDataObj.internship_organization.length; i++) {
            finalData.internships.push({
                organization: formDataObj.internship_organization[i],
                role: formDataObj.internship_role[i],
                duration: formDataObj.internship_duration[i],
                contribution: formDataObj.internship_contribution[i],
            });
        }
    }

    // Group work experience (only for professionals)
    if (formDataObj.profileType === "professional" && formDataObj.company) {
        for (let i = 0; i < formDataObj.company.length; i++) {
            finalData.experience.push({
                company: formDataObj.company[i],
                jobTitle: formDataObj.jobTitle[i],
                workDuration: formDataObj.workDuration[i],
                responsibilities: formDataObj.responsibilities[i],
            });
        }
    }

    // Group achievements
    if (formDataObj.achievementTitle) {
        for (let i = 0; i < formDataObj.achievementTitle.length; i++) {
            finalData.achievements.push({
                title: formDataObj.achievementTitle[i],
                date: formDataObj.achievementDate[i],
                description: formDataObj.achievementDescription[i],
            });
        }
    }

    // Group certifications
    if (formDataObj.certificationTitle) {
        for (let i = 0; i < formDataObj.certificationTitle.length; i++) {
            finalData.certifications.push({
                title: formDataObj.certificationTitle[i],
                issuer: formDataObj.certificationIssuer[i],
                date: formDataObj.certificationDate[i],
                certificateNumber: formDataObj.certificationNumber[i],
                validity: formDataObj.certificationValidity[i],
            });
        }
    }

    console.log('Form submitted:', finalData);
    downloadObjectAsJson(finalData, "resume-data");
});

    // Helper function to download data as a JSON file
    function downloadObjectAsJson(exportObj, exportName) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }});

# Personal Portfolio Webpage
**BCSE203E - Web Programming | Digital Assignment - I**

**Name:** Vichruth M  
**University:** Vellore Institute of Technology (VIT)  
**Major:** B.Tech Computer Science and Engineering  

---

## 1. Project Links
* **Live Webpage:** [https://vichruth.github.io](https://vichruth.github.io)
* **GitHub Repository:** [https://github.com/vichruth/vichruth.github.io](https://github.com/vichruth/vichruth.github.io)

---

## 2. Step-by-Step Documentation

### Development Process
1. **Repository Setup:** Created a public repository on GitHub named `vichruth.github.io` to enable automatic GitHub Pages deployment.
2. **Local Environment:** Cloned the repository locally and set up the file structure (`index.html`, `style.css`, `script.js`) using VS Code.
3. **HTML Structuring:** Developed the semantic HTML structure, creating dedicated sections for the Hero introduction, About/Skills, Work Experience, Projects & Research, and Education. 
4. **Content Integration:** Integrated professional details, highlighting specific machine learning internships (KalkiNi, Cloudstier) and research projects (Low-Parameter Bug Detector, Pre-Cog Brakes).
5. **CSS Styling:** Wrote custom, dependency-free CSS to build a fully responsive layout. Implemented CSS Grid for the project cards and Flexbox for the navigation and footer.
6. **JavaScript Animation:** Added a lightweight `IntersectionObserver` script to handle smooth fade-in animations as the user scrolls through the sections.
7. **Version Control:** Used Git commands (`git add`, `git commit`, `git push`) to continuously back up code and track changes.

### Tools Used
* **Languages:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Editor:** Visual Studio Code (with Live Server extension)
* **Version Control & Hosting:** Git, GitHub, GitHub Pages

### Design Choices
* **Aesthetic:** Chose a clean, formal, and professional layout (slate gray, navy blue, and crisp white) to reflect an academic and research-oriented engineering profile.
* **Architecture:** Opted for pure, custom CSS rather than heavy frameworks like Tailwind or Bootstrap to ensure maximum performance, zero external dependencies, and a deeper understanding of core CSS mechanics.
* **UX:** Implemented a sticky navigation bar for easy access across the single-page layout and utilized scroll-triggered animations to make the browsing experience feel premium without impacting load times.

### Challenges Faced
* **Browser Caching:** During deployment, the browser heavily cached older versions of the CSS. This was overcome by utilizing "Hard Refreshes" and tracking the live build status on GitHub Actions to ensure the latest code was actually deployed before testing.
* **Responsive Grids:** Ensuring the complex text (like the XGBoost Strategy Engine details) fit neatly into cards on both desktop and mobile required careful tuning of CSS media queries (`@media`) and dynamic `clamp()` font sizes.

---

## 3. Reflection on Learning

Throughout the development of this portfolio, I gained practical insights into modern web development:

1. **Semantic HTML:** Learned the importance of structuring documents with semantic tags (`<header>`, `<section>`, `<nav>`) for better accessibility and SEO.
2. **CSS Custom Properties:** Mastered the use of CSS variables (`:root`) to maintain a consistent color palette across the entire application.
3. **Responsive Layouts:** Deepened my understanding of CSS Grid and Flexbox, allowing me to build adaptive interfaces without relying on third-party libraries.
4. **Fluid Typography:** Learned how to use CSS `clamp()` functions to make typography scale naturally between mobile and desktop screens.
5. **DOM Manipulation:** Understood how to connect JavaScript to HTML elements to create interactive DOM events.
6. **Performance Optimization:** Realized that vanilla JavaScript `IntersectionObserver` is significantly more performant for scroll animations than traditional scroll event listeners.
7. **Git Workflow:** solidified my muscle memory for standard version control workflows (`add`, `commit`, `push`) and writing meaningful commit messages.
8. **Deployment Architecture:** Learned how GitHub Pages serves static files directly from a repository and how to monitor deployment workflows.
9. **Debugging Caches:** Developed strategies to bypass stubborn browser caches (like Firefox's enhanced tracking protection) during local server testing.
10. **Digital Storytelling:** Learned how to logically group and present complex technical projects (like my Kaggle competitions and ML research) into scannable, visually appealing UI components.

---

## 4. The Importance of a Personal Webpage

In the modern digital world, a personal webpage is far more than just a digital resume; it is a centralized hub for professional branding. As an aspiring Machine Learning Engineer, my portfolio allows me to control my professional narrative and showcase my technical capabilities in an interactive format that a static PDF simply cannot match. It provides a platform to seamlessly link my GitHub repositories, Kaggle models, and research papers in one cohesive space. Furthermore, hosting it via version control demonstrates a foundational understanding of software engineering practices, making it an invaluable tool for networking, securing internships, and standing out to academic recruiters.

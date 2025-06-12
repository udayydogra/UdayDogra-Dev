<script setup>
import { ref, onMounted } from 'vue'
import { 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Calendar,
  MapPin,
  Code,
  Database,
  Tool,
  Award,
  GraduationCap,
  User,
  Briefcase,
  ChevronDown,
  Menu,
  X
} from 'lucide-vue-next'

const isMenuOpen = ref(false)
const activeSection = ref('home')

const skills = {
  languages: ['Python', 'JavaScript', 'C++', 'C'],
  frontend: ['HTML5', 'CSS3', 'React.js', 'Vue.js'],
  backend: ['Python (Flask)', 'Shell Scripting', 'Tkinter'],
  databases: ['PostgreSQL', 'MySQL'],
  tools: ['Git', 'Linux', 'VS Code', 'Salesforce'],
  concepts: ['OOP', 'Debugging', 'Agile', 'Version Control']
}

const projects = [
  {
    title: 'SynaptiFlow',
    subtitle: 'AI Note-Taking Platform',
    year: '2024–2025',
    url: 'https://www.synaptiflow.space',
    description: 'Built an AI-driven productivity tool using React.js, PostgreSQL, Python, RAG. Designed document parser, implemented RAG-based semantic search, and developed backend APIs. Improved researcher workflow with structured data visualization.',
    tech: ['React.js', 'PostgreSQL', 'Python', 'RAG']
  },
  {
    title: 'Hacker\'s Helper',
    subtitle: 'Linux Automation Tool',
    year: '2024',
    description: 'Created a GUI-based Linux script executor using Python, Tkinter, Shell Scripting. Enhanced automation and reduced repetitive task execution by 30%.',
    tech: ['Python', 'Tkinter', 'Shell Scripting']
  },
  {
    title: 'Instagram Clone',
    subtitle: 'Front-End Project',
    year: '2023',
    description: 'Developed a responsive Instagram interface using HTML, CSS. Practiced layout design and interactive elements.',
    tech: ['HTML', 'CSS']
  }
]

const experience = [
  {
    title: 'President',
    organization: 'Coding Club',
    period: 'Jan 2025 – Present',
    description: 'Organized and led coding hackathons, technical quizzes, and alumni knowledge-sharing sessions. Mentored junior developers and coordinated peer-learning initiatives.'
  },
  {
    title: 'Member',
    organization: 'Coding Club',
    period: 'Jan 2023 – Dec 2024',
    description: 'Assisted in logistics and planning of events, including bootcamps and workshops. Supported digital outreach and technical content creation.'
  }
]

const certifications = [
  {
    title: 'CyberSecurity Fundamentals',
    issuer: 'A2IT',
    date: 'Jul 2024',
    id: 'A2ITMH-11001'
  },
  {
    title: 'CyberSecurity and Network Defense',
    issuer: 'C-DAC, Noida',
    date: 'Oct 2024',
    id: '1566/330088/CG/(20)/2024'
  },
  {
    title: 'React.js Frontend Development',
    issuer: 'Internshala',
    date: 'Aug 2024',
    id: '7brw416ce5ybIcsa'
  }
]

const education = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'I.K. Gujral Punjab Technical University',
    period: '2022 – Present',
    grade: 'CGPA: 7.8 / 10'
  },
  {
    degree: 'Class XII (CBSE)',
    period: '2022',
    grade: 'Percentage: 63%'
  },
  {
    degree: 'Class X (CBSE)',
    period: '2020',
    grade: 'Percentage: 73.5%'
  }
]

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  isMenuOpen.value = false
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.3 }
  )

  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section)
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="font-bold text-xl text-gray-900">Uday Dogra</div>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex space-x-8">
            <button 
              v-for="item in ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact']"
              :key="item"
              @click="scrollToSection(item)"
              :class="[
                'capitalize transition-colors duration-200',
                activeSection === item ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              {{ item }}
            </button>
          </div>

          <!-- Mobile menu button -->
          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
          >
            <Menu v-if="!isMenuOpen" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-gray-200">
          <div class="flex flex-col space-y-2">
            <button 
              v-for="item in ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact']"
              :key="item"
              @click="scrollToSection(item)"
              class="text-left px-4 py-2 text-gray-600 hover:text-gray-900 capitalize"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <div class="mb-8">
            <div class="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-6">
              UD
            </div>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Uday Dogra
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-8">
            Software Developer (Fresher)
          </p>
          <div class="flex flex-wrap justify-center gap-4 mb-8">
            <a href="tel:+919478204726" class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Phone class="h-5 w-5" />
              +91 94782 04726
            </a>
            <a href="mailto:Budaydogra204@gmail.com" class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Mail class="h-5 w-5" />
              Budaydogra204@gmail.com
            </a>
            <a href="https://github.com/udayydogra" target="_blank" class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Github class="h-5 w-5" />
              github.com/udayydogra
            </a>
            <a href="#" class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Linkedin class="h-5 w-5" />
              udaydogra
            </a>
          </div>
          <button 
            @click="scrollToSection('about')"
            class="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn More
            <ChevronDown class="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div class="max-w-4xl mx-auto">
          <div class="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div class="flex items-start gap-4 mb-6">
              <User class="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-4">Summary</h3>
                <p class="text-gray-700 leading-relaxed text-lg">
                  Aspiring Software Developer with a strong foundation in object-oriented programming, full-stack web development, and version control. Proficient in Python, JavaScript, and React, with hands-on experience using PostgreSQL and Git. Built AI-powered and automation-based tools for note-taking, Linux scripting, and UI development. Strong problem-solving ability, collaborative mindset, and passion for clean, efficient code. Seeking to contribute to impactful projects.
                </p>
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h4 class="font-semibold text-gray-900 mb-3">Languages Known</h4>
                <div class="flex flex-wrap gap-2">
                  <span v-for="lang in ['English', 'Hindi', 'Punjabi']" :key="lang" 
                        class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {{ lang }}
                  </span>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-3">Interests</h4>
                <div class="flex flex-wrap gap-2">
                  <span v-for="interest in ['Cybersecurity trends', 'Open-source tools', 'AI automation', 'Emerging tech']" 
                        :key="interest" 
                        class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {{ interest }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
          <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <Code class="h-8 w-8 text-blue-600" />
              <h3 class="text-xl font-semibold text-gray-900">Languages</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in skills.languages" :key="skill" 
                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <Code class="h-8 w-8 text-green-600" />
              <h3 class="text-xl font-semibold text-gray-900">Frontend</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in skills.frontend" :key="skill" 
                    class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <Database class="h-8 w-8 text-purple-600" />
              <h3 class="text-xl font-semibold text-gray-900">Backend & Frameworks</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in skills.backend" :key="skill" 
                    class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <Database class="h-8 w-8 text-orange-600" />
              <h3 class="text-xl font-semibold text-gray-900">Databases</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in skills.databases" :key="skill" 
                    class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <Tool class="h-8 w-8 text-red-600" />
              <h3 class="text-xl font-semibold text-gray-900">Tools</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in skills.tools" :key="skill" 
                    class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center gap-3 mb-4">
              <Code class="h-8 w-8 text-indigo-600" />
              <h3 class="text-xl font-semibold text-gray-900">Concepts</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in skills.concepts" :key="skill" 
                    class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projects</h2>
          <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="project in projects" :key="project.title" 
               class="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ project.title }}</h3>
                <p class="text-blue-600 font-medium">{{ project.subtitle }}</p>
              </div>
              <span class="text-sm text-gray-500 bg-white px-2 py-1 rounded">{{ project.year }}</span>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tech in project.tech" :key="tech" 
                    class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                {{ tech }}
              </span>
            </div>
            <a v-if="project.url" :href="project.url" target="_blank" 
               class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              View Project
              <ExternalLink class="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Experience</h2>
          <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div class="max-w-4xl mx-auto">
          <div class="space-y-8">
            <div v-for="exp in experience" :key="exp.title" 
                 class="bg-white rounded-xl p-6 shadow-sm">
              <div class="flex items-start gap-4">
                <Briefcase class="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                <div class="flex-1">
                  <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 class="text-xl font-semibold text-gray-900">{{ exp.title }}</h3>
                    <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{{ exp.period }}</span>
                  </div>
                  <p class="text-blue-600 font-medium mb-3">{{ exp.organization }}</p>
                  <p class="text-gray-700 leading-relaxed">{{ exp.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education & Certifications Section -->
    <section id="education" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Education & Certifications</h2>
          <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Education -->
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <GraduationCap class="h-7 w-7 text-blue-600" />
              Education
            </h3>
            <div class="space-y-6">
              <div v-for="edu in education" :key="edu.degree" 
                   class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ edu.degree }}</h4>
                <p class="text-blue-600 font-medium mb-1">{{ edu.institution || 'CBSE Board' }}</p>
                <div class="flex justify-between items-center text-sm text-gray-600">
                  <span>{{ edu.period }}</span>
                  <span class="bg-green-100 text-green-800 px-2 py-1 rounded">{{ edu.grade }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Certifications -->
          <div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Award class="h-7 w-7 text-blue-600" />
              Certifications
            </h3>
            <div class="space-y-6">
              <div v-for="cert in certifications" :key="cert.title" 
                   class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ cert.title }}</h4>
                <p class="text-blue-600 font-medium mb-2">{{ cert.issuer }}</p>
                <div class="flex justify-between items-center text-sm text-gray-600">
                  <span class="flex items-center gap-1">
                    <Calendar class="h-4 w-4" />
                    {{ cert.date }}
                  </span>
                  <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    ID: {{ cert.id }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <div class="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects. Let's connect!
          </p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white rounded-xl p-8 shadow-sm">
              <h3 class="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div class="space-y-4">
                <a href="tel:+919478204726" 
                   class="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone class="h-6 w-6 text-blue-600" />
                  <div>
                    <p class="font-medium text-gray-900">Phone</p>
                    <p class="text-gray-600">+91 94782 04726</p>
                  </div>
                </a>
                <a href="mailto:Budaydogra204@gmail.com" 
                   class="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail class="h-6 w-6 text-blue-600" />
                  <div>
                    <p class="font-medium text-gray-900">Email</p>
                    <p class="text-gray-600">Budaydogra204@gmail.com</p>
                  </div>
                </a>
                <a href="https://github.com/udayydogra" target="_blank"
                   class="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <Github class="h-6 w-6 text-blue-600" />
                  <div>
                    <p class="font-medium text-gray-900">GitHub</p>
                    <p class="text-gray-600">github.com/udayydogra</p>
                  </div>
                </a>
                <a href="#" class="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <Linkedin class="h-6 w-6 text-blue-600" />
                  <div>
                    <p class="font-medium text-gray-900">LinkedIn</p>
                    <p class="text-gray-600">udaydogra</p>
                  </div>
                </a>
              </div>
            </div>

            <div class="bg-white rounded-xl p-8 shadow-sm">
              <h3 class="text-2xl font-semibold text-gray-900 mb-6">Quick Message</h3>
              <form class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows="4" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                <button type="submit" 
                        class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-gray-400">
            © 2025 Uday Dogra. Built with Vue 3 and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>

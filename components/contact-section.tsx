"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, Github, Linkedin, Send, MessageSquare, Zap } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            <MessageSquare className="h-4 w-4" />
            Communication Hub
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Start a Conversation</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's connect and build something amazing together!
          </p>
        </div>

        {/* Rule of thirds: Contact info on left 1/3, form on right 2/3 */}
        <div className="grid grid-cols-3 gap-12">
          {/* Left 1/3 - Contact Information */}
          <div className="col-span-1 space-y-6">
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-400" />
                Quick Connect
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+919478204726"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all duration-300 group"
                >
                  <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Phone</p>
                    <p className="text-green-300 text-sm">+91 94782 04726</p>
                  </div>
                </a>

                <a
                  href="mailto:Budaydogra204@gmail.com"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all duration-300 group"
                >
                  <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Email</p>
                    <p className="text-blue-300 text-sm">Budaydogra204@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://github.com/udayydogra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-500/20 to-slate-500/20 border border-gray-500/30 rounded-lg hover:bg-gray-500/30 transition-all duration-300 group"
                >
                  <div className="p-2 bg-gray-600 rounded-lg group-hover:scale-110 transition-transform">
                    <Github className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">GitHub</p>
                    <p className="text-gray-300 text-sm">udayydogra</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-600/30 rounded-lg hover:bg-blue-600/30 transition-all duration-300 group"
                >
                  <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                    <Linkedin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">LinkedIn</p>
                    <p className="text-blue-300 text-sm">udaydogra</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-yellow-400 font-bold">Quick Response</div>
                <div className="text-white text-sm">Usually responds within 24 hours</div>
                <div className="text-gray-400 text-xs mt-2">+100 XP for each message!</div>
              </div>
            </div>
          </div>

          {/* Right 2/3 - Contact Form */}
          <div className="col-span-2">
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Send className="h-8 w-8 text-purple-400" />
                Send Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
                      Player Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
                    Quest Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project, collaboration ideas, or just say hello!"
                  />
                </div>

                {/* Form Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-black/30 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="text-green-400 font-bold">Response Rate</div>
                    <div className="text-white text-2xl">98%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-bold">Avg. Response</div>
                    <div className="text-white text-2xl">12h</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-bold">Success Rate</div>
                    <div className="text-white text-2xl">95%</div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 hover:scale-105"
                >
                  <Send className="h-5 w-5" />
                  Launch Message
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">+50 XP</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

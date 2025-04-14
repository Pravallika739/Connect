document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    
    function toggleTheme() {
      document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuToggle.querySelector('[data-lucide="menu"]');
    
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Change icon between menu and x
      if (mobileMenu.classList.contains('active')) {
        menuIcon.setAttribute('name', 'x');
        lucide.createIcons();
      } else {
        menuIcon.setAttribute('name', 'menu');
        lucide.createIcons();
      }
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Tab functionality in dashboard
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to current button and pane
        this.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // Handle navigation for tabs that should redirect
        if (tabName !== 'ideas' && getCurrentPage() === 'dashboard') {
          const redirectMap = {
            'teams': 'team-building',
            'mentors': 'mentorship',
            'funding': 'funding',
            'freelancers': 'freelancers'
          };
          
          navigateTo(redirectMap[tabName]);
        }
      });
    });
  
    // Team Building Page Tabs
    const teamTabs = document.querySelectorAll('[data-team-tab]');
    const teamTabContents = document.querySelectorAll('.team-tab-content');
    
    teamTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-team-tab');
        
        // Remove active class from all tabs and contents
        teamTabs.forEach(t => t.classList.remove('active'));
        teamTabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to current tab and content
        this.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
      });
    });
  
    // Mentorship Page Tabs
    const mentorTabs = document.querySelectorAll('[data-mentor-tab]');
    
    mentorTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-mentor-tab');
        
        // Remove active class from all tabs and contents
        mentorTabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.team-tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to current tab and content
        this.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
      });
    });
  
    // Funding Page Tabs
    const fundingTabs = document.querySelectorAll('[data-funding-tab]');
    
    fundingTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-funding-tab');
        
        // Remove active class from all tabs and contents
        fundingTabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.team-tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to current tab and content
        this.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
      });
    });
  
    // Freelancers Page Tabs
    const freelancerTabs = document.querySelectorAll('[data-freelancer-tab]');
    
    freelancerTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-freelancer-tab');
        
        // Remove active class from all tabs and contents
        freelancerTabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.team-tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to current tab and content
        this.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
      });
    });
  
    // Pricing toggle functionality
    const billingToggle = document.getElementById('billing-toggle');
    const proPrice = document.getElementById('pro-price');
    const enterprisePrice = document.getElementById('enterprise-price');
    
    billingToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      
      if (this.classList.contains('active')) {
        // Annual pricing
        proPrice.innerHTML = '<span class="pricing-card-price-currency">$</span>23<span class="pricing-card-price-period">/month</span>';
        enterprisePrice.innerHTML = '<span class="pricing-card-price-currency">$</span>79<span class="pricing-card-price-period">/month</span>';
      } else {
        // Monthly pricing
        proPrice.innerHTML = '<span class="pricing-card-price-currency">$</span>29<span class="pricing-card-price-period">/month</span>';
        enterprisePrice.innerHTML = '<span class="pricing-card-price-currency">$</span>99<span class="pricing-card-price-period">/month</span>';
      }
    });
  
    // Client-side routing
    function navigateTo(route) {
      // Hide all pages
      document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
      });
      
      // Show the requested page
      const page = document.getElementById(`${route}-page`);
      if (page) {
        page.classList.add('active');
        window.scrollTo(0, 0);
        
        // Update URL without page reload
        history.pushState({ route }, '', `#${route}`);
      }
    }
    
    function getCurrentPage() {
      const hash = window.location.hash.substring(1);
      return hash || 'home';
    }
    
    // Handle navigation links
    document.querySelectorAll('[data-route]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const route = this.getAttribute('data-route');
        navigateTo(route);
        
        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          menuIcon.setAttribute('name', 'menu');
          lucide.createIcons();
        }
      });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
      if (e.state && e.state.route) {
        navigateTo(e.state.route);
      } else {
        navigateTo('home');
      }
    });
    
    // Initialize based on URL hash
    const initialRoute = getCurrentPage();
    navigateTo(initialRoute);
    
    // Load team members data
    const teamMembersContainer = document.getElementById('team-members-container');
    if (teamMembersContainer) {
      const teamMembers = [
        {
          id: 1,
          name: "Alex Johnson",
          role: "Full Stack Developer",
          skills: ["React", "Node.js", "TypeScript", "MongoDB"],
          avatar: "/placeholder.svg?height=40&width=40",
          match: 95
        },
        {
          id: 2,
          name: "Sarah Williams",
          role: "UX/UI Designer",
          skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
          avatar: "/placeholder.svg?height=40&width=40",
          match: 88
        },
        {
          id: 3,
          name: "Michael Chen",
          role: "Product Manager",
          skills: ["Product Strategy", "Agile", "Market Research", "Data Analysis"],
          avatar: "/placeholder.svg?height=40&width=40",
          match: 82
        }
      ];
      
      // Render team members
      teamMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'card card-hover';
        
        memberCard.innerHTML = `
          <div class="card-header">
            <div class="member-header">
              <div class="member-info">
                <div class="avatar">
                  <img src="${member.avatar}" alt="${member.name}">
                </div>
                <div>
                  <h3 class="card-title">${member.name}</h3>
                  <p class="card-description">${member.role}</p>
                </div>
              </div>
              <span class="badge badge-secondary">
                <i data-lucide="star" class="badge-icon"></i>
                ${member.match}% Match
              </span>
            </div>
          </div>
          <div class="card-content">
            <div class="badge-container">
              ${member.skills.map(skill => `<span class="badge badge-outline">${skill}</span>`).join('')}
            </div>
          </div>
          <div class="card-footer">
            <div class="button-group">
              <button class="btn btn-outline btn-sm">
                <i data-lucide="message-square" class="btn-icon"></i> Message
              </button>
              <button class="btn btn-primary btn-sm">
                <i data-lucide="user-plus" class="btn-icon"></i> Invite
              </button>
            </div>
          </div>
        `;
        
        teamMembersContainer.appendChild(memberCard);
      });
      
      // Initialize icons in dynamically added content
      lucide.createIcons();
    }
    
    // Load team building members
    const teamBuildingMembers = document.getElementById('team-building-members');
    if (teamBuildingMembers) {
      const members = [
        {
          id: 1,
          name: "Alex Johnson",
          role: "Full Stack Developer",
          skills: ["React", "Node.js", "TypeScript", "MongoDB"],
          location: "San Francisco, CA",
          bio: "Passionate developer with 5 years of experience building web applications.",
          avatar: "/placeholder.svg?height=40&width=40",
          match: 95
        },
        {
          id: 2,
          name: "Sarah Williams",
          role: "UX/UI Designer",
          skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
          location: "New York, NY",
          bio: "Creative designer focused on creating intuitive and beautiful user experiences.",
          avatar: "/placeholder.svg?height=40&width=40",
          match: 88
        },
        {
          id: 3,
          name: "Michael Chen",
          role: "Product Manager",
          skills: ["Product Strategy", "Agile", "Market Research", "Data Analysis"],
          location: "Austin, TX",
          bio: "Product manager with a background in tech and business development.",
          avatar: "/placeholder.svg?height=40&width=40",
          match: 82
        },
        {
          id: 4,
          name: "Emily Rodriguez",
          role: "Marketing Specialist",
          skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media"],
          location: "Chicago, IL",
          bio: "Marketing professional specializing in growth strategies for startups.",
          avatar: "/placeholder.svg?height=40&width=40",
          match: 79
        }
      ];
      
      // Render team members
      members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'card card-hover';
        
        memberCard.innerHTML = `
          <div class="card-header">
            <div class="member-header">
              <div class="member-info">
                <div class="avatar">
                  <img src="${member.avatar}" alt="${member.name}">
                </div>
                <div>
                  <h3 class="card-title">${member.name}</h3>
                  <p class="card-description">${member.role}</p>
                </div>
              </div>
              <span class="badge badge-secondary">
                <i data-lucide="star" class="badge-icon"></i>
                ${member.match}% Match
              </span>
            </div>
          </div>
          <div class="card-content">
            <p class="text-muted" style="margin-bottom: 0.5rem;">${member.bio}</p>
            <p class="text-muted" style="font-size: 0.75rem; margin-bottom: 0.75rem;">${member.location}</p>
            <div class="badge-container">
              ${member.skills.map(skill => `<span class="badge badge-outline">${skill}</span>`).join('')}
            </div>
          </div>
          <div class="card-footer">
            <div class="button-group">
              <button class="btn btn-outline btn-sm">
                <i data-lucide="message-square" class="btn-icon"></i> Message
              </button>
              <button class="btn btn-primary btn-sm">
                <i data-lucide="user-plus" class="btn-icon"></i> Invite
              </button>
            </div>
          </div>
        `;
        
        teamBuildingMembers.appendChild(memberCard);
      });
      
      // Initialize icons in dynamically added content
      lucide.createIcons();
    }
    
    // Load mentors data
    const mentorsContainer = document.getElementById('mentors-container');
    if (mentorsContainer) {
      const mentors = [
        {
          id: 1,
          name: "Dr. James Wilson",
          role: "CTO",
          company: "TechInnovate",
          expertise: ["Software Architecture", "AI/ML", "Tech Leadership"],
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.9
        },
        {
          id: 2,
          name: "Amanda Chen",
          role: "Founder & CEO",
          company: "GrowthLabs",
          expertise: ["Startup Strategy", "Fundraising", "Product-Market Fit"],
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.8
        }
      ];
      
      // Render mentors
      mentors.forEach(mentor => {
        const mentorCard = document.createElement('div');
        mentorCard.className = 'card card-hover';
        
        mentorCard.innerHTML = `
          <div class="card-header">
            <div class="member-header">
              <div class="member-info">
                <div class="avatar">
                  <img src="${mentor.avatar}" alt="${mentor.name}">
                </div>
                <div>
                  <h3 class="card-title">${mentor.name}</h3>
                  <p class="card-description">
                    <i data-lucide="building" style="width: 0.75rem; height: 0.75rem; display: inline; margin-right: 0.25rem;"></i>
                    ${mentor.role} at ${mentor.company}
                  </p>
                </div>
              </div>
              <span class="badge badge-secondary">
                <i data-lucide="star" class="badge-icon"></i>
                ${mentor.rating}
              </span>
            </div>
          </div>
          <div class="card-content">
            <div class="badge-container">
              ${mentor.expertise.map(exp => `<span class="badge badge-outline">${exp}</span>`).join('')}
            </div>
          </div>
          <div class="card-footer">
            <div class="button-group">
              <button class="btn btn-outline btn-sm">
                <i data-lucide="message-square" class="btn-icon"></i> Message
              </button>
              <button class="btn btn-primary btn-sm">
                <i data-lucide="calendar" class="btn-icon"></i> Book Session
              </button>
            </div>
          </div>
        `;
        
        mentorsContainer.appendChild(mentorCard);
      });
      
      // Initialize icons in dynamically added content
      lucide.createIcons();
    }
    
    // Load mentorship mentors
    const mentorshipMentors = document.getElementById('mentorship-mentors');
    if (mentorshipMentors) {
      const mentors = [
        {
          id: 1,
          name: "Dr. James Wilson",
          role: "CTO",
          company: "TechInnovate",
          expertise: ["Software Architecture", "AI/ML", "Tech Leadership"],
          hourlyRate: "$150/hr",
          location: "San Francisco, CA",
          bio: "Former Google engineer with 15+ years of experience building scalable systems.",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.9
        },
        {
          id: 2,
          name: "Amanda Chen",
          role: "Founder & CEO",
          company: "GrowthLabs",
          expertise: ["Startup Strategy", "Fundraising", "Product-Market Fit"],
          hourlyRate: "$200/hr",
          location: "New York, NY",
          bio: "Serial entrepreneur who has raised over $50M in venture funding across 3 startups.",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.8
        },
        {
          id: 3,
          name: "Michael Rodriguez",
          role: "VP of Marketing",
          company: "ScaleUp",
          expertise: ["Growth Marketing", "Brand Strategy", "Go-to-Market"],
          hourlyRate: "$125/hr",
          location: "Austin, TX",
          bio: "Marketing executive who has helped 20+ startups scale from zero to millions in revenue.",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.7
        },
        {
          id: 4,
          name: "Sarah Johnson",
          role: "Product Director",
          company: "ProductLabs",
          expertise: ["Product Strategy", "UX Design", "Agile Methodology"],
          hourlyRate: "$175/hr",
          location: "Seattle, WA",
          bio: "Product leader with experience at Amazon and Microsoft, specializing in consumer products.",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.8
        }
      ];
      
      // Render mentors
      mentors.forEach(mentor => {
        const mentorProfile = document.createElement('div');
        mentorProfile.className = 'mentor-profile';
        
        mentorProfile.innerHTML = `
          <div class="mentor-header">
            <div class="mentor-avatar">
              <img src="${mentor.avatar}" alt="${mentor.name}">
            </div>
            <div class="mentor-info">
              <h3 class="mentor-name">${mentor.name}</h3>
              <p class="mentor-role">${mentor.role} at ${mentor.company}</p>
              <div class="mentor-rating">
                <i data-lucide="star" class="mentor-star"></i>
                <span>${mentor.rating}</span>
              </div>
            </div>
          </div>
          <p class="mentor-bio">${mentor.bio}</p>
          <p style="font-size: 0.75rem; color: var(--muted-foreground); margin-bottom: 0.75rem;">${mentor.location}</p>
          <div class="mentor-expertise">
            ${mentor.expertise.map(exp => `<span class="badge badge-outline">${exp}</span>`).join('')}
          </div>
          <div style="font-size: 0.875rem; font-weight: 500; margin-bottom: 1rem;">
            <i data-lucide="dollar-sign" style="width: 0.75rem; height: 0.75rem; display: inline; margin-right: 0.25rem;"></i>
            ${mentor.hourlyRate}
          </div>
          <div class="mentor-actions">
            <button class="btn btn-outline">
              <i data-lucide="message-square" class="btn-icon"></i> Message
            </button>
            <button class="btn btn-primary">
              <i data-lucide="calendar" class="btn-icon"></i> Book Session
            </button>
          </div>
        `;
        
        mentorshipMentors.appendChild(mentorProfile);
      });
      
      // Initialize icons in dynamically added content
      lucide.createIcons();
    }
    
    // Load investors data
    const investorsContainer = document.getElementById('investors-container');
    if (investorsContainer) {
      const investors = [
        {
          id: 1,
          name: "Robert Chen",
          company: "Horizon Ventures",
          domains: ["Technology", "AI", "SaaS"],
          investmentRange: "$100K - $500K",
          avatar: "/placeholder.svg?height=40&width=40",
          match: 94
        },
        {
          id: 2,
          name: "Lisa Thompson",
          company: "Green Capital",
          domains: ["Sustainability", "CleanTech", "FoodTech"],
          investmentRange: "$250K - $1M",
          avatar: "/placeholder.svg?height=40&width=40",
          match: 87
        }
      ];
      
      // Render investors
      investors.forEach(investor => {
        const investorCard = document.createElement('div');
        investorCard.className = 'card card-hover';
        
        investorCard.innerHTML = `
          <div class="card-header">
            <div class="member-header">
              <div class="member-info">
                <div class="avatar">
                  <img src="${investor.avatar}" alt="${investor.name}">
                </div>
                <div>
                  <h3 class="card-title">${investor.name}</h3>
                  <p class="card-description">
                    <i data-lucide="building" style="width: 0.75rem; height: 0.75rem; display: inline; margin-right: 0.25rem;"></i>
                    ${investor.company}
                  </p>
                </div>
              </div>
              <span class="badge badge-secondary">
                <i data-lucide="star" class="badge-icon"></i>
                ${investor.match}% Match
              </span>
            </div>
          </div>
          <div class="card-content">
            <div class="badge-container">
              ${investor.domains.map(domain => `<span class="badge badge-outline">${domain}</span>`).join('')}
            </div>
            <div style="font-size: 0.875rem; font-weight: 500;">
              <i data-lucide="dollar-sign" style="width: 0.75rem; height: 0.75rem; display: inline; margin-right: 0.25rem;"></i>
              ${investor.investmentRange}
            </div>
          </div>
          <div class="card-footer">
            <div class="button-group">
              <button class="btn btn-outline btn-sm">
                <i data-lucide="message-square" class="btn-icon"></i> Message
              </button>
              <button class="btn btn-primary btn-sm">
                <i data-lucide="briefcase" class="btn-icon"></i> Pitch
              </button>
            </div>
          </div>
        `;
        
        investorsContainer.appendChild(investorCard);
      });
      
      // Initialize icons in dynamically added content
      lucide.createIcons();
    }
    
    // Load funding investors
    const fundingInvestors = document.getElementById('funding-investors');
    if (fundingInvestors) {
      const investors = [
        {
          id: 1,
          name: "Robert Chen",
          company: "Horizon Ventures",
          domains: ["Technology", "AI", "SaaS"],
          investmentRange: "$100K - $500K",
          location: "San Francisco, CA",
          bio: "Early-stage investor focused on innovative tech startups with global potential.",
          avatar: "/placeholder.svg?height=40&width=40",
          match: 94
        },
        {
          id: 2,
          name: "Lisa Thompson",
          company: "Green Capital",
          domains: ["Sustainability", "CleanTech", "FoodTech"],
          investmentRange: "$250K - $1M",
          location: "Boston, MA",
          bio: "Impact investor supporting startups addressing environmental challenges.",
          avatar: "/placeholder.svg?height=40&width=40",
          match: 87
        },
        {
          id: 3,
          name: "David Wilson",
          company: "Nexus Partners",
          domains: ["FinTech", "Blockchain", "InsurTech"],
          investmentRange: "$500K - $2M",
          location: "New York, NY",
          bio: "Experienced investor with a background in financial services and technology.",
          avatar: "/placeholder.svg?height=40&width=40",
          match: 82
        },
        {
          id: 4,
          name: "Sophia Martinez",
          company: "Elevate Fund",
          domains: ["Healthcare", "BioTech", "MedTech"],
          investmentRange: "$1M - $5M",
          location: "Austin, TX",
          bio: "Healthcare-focused investor supporting innovative medical solutions.",
          avatar: "/placeholder.svg?height=40&width=40",
          match: 78
        }
      ];
      
      // Render investors
      investors.forEach(investor => {
        const investorProfile = document.createElement('div');
        investorProfile.className = 'investor-profile';
        
        investorProfile.innerHTML = `
          <div class="investor-header">
            <div class="investor-avatar">
              <img src="${investor.avatar}" alt="${investor.name}">
            </div>
            <div class="investor-info">
              <h3 class="investor-name">${investor.name}</h3>
              <p class="investor-company">
                <i data-lucide="building" style="width: 0.75rem; height: 0.75rem; display: inline; margin-right: 0.25rem;"></i>
                ${investor.company}
              </p>
              <div class="investor-match">
                <i data-lucide="star" style="width: 0.75rem; height: 0.75rem; color: var(--primary); fill: var(--primary);"></i>
                <span>${investor.match}% Match</span>
              </div>
            </div>
          </div>
          <p class="investor-bio">${investor.bio}</p>
          <p style="font-size: 0.75rem; color: var(--muted-foreground); margin-bottom: 0.75rem;">${investor.location}</p>
          <div class="investor-domains">
            ${investor.domains.map(domain => `<span class="badge badge-outline">${domain}</span>`).join('')}
          </div>
          <div class="investor-range">
            <i data-lucide="dollar-sign" style="width: 0.75rem; height: 0.75rem; display: inline; margin-right: 0.25rem;"></i>
            ${investor.investmentRange}
          </div>
          <div class="investor-actions">
            <button class="btn btn-outline">
              <i data-lucide="message-square" class="btn-icon"></i> Message
            </button>
            <button class="btn btn-primary">
              <i data-lucide="briefcase" class="btn-icon"></i> Pitch
            </button>
          </div>
        `;
        
        fundingInvestors.appendChild(investorProfile);
      });
      
      // Initialize icons in dynamically added content
      lucide.createIcons();
    }
    
    // Load freelancers data
    const freelancersContainer = document.getElementById('freelancers-container');
    if (freelancersContainer) {
      const freelancers = [
        {
          id: 1,
          name: "Daniel Lee",
          role: "Full Stack Developer",
          skills: ["React", "Node.js", "MongoDB", "AWS"],
          hourlyRate: "$65/hr",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.9
        },
        {
          id: 2,
          name: "Jessica Kim",
          role: "UI/UX Designer",
          skills: ["Figma", "Adobe XD", "Sketch", "User Research"],
          hourlyRate: "$55/hr",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.8
        }
      ];
      
      // Render freelancers
      freelancers.forEach(freelancer => {
        const freelancerCard = document.createElement('div');
        freelancerCard.className = 'card card-hover';
        
        freelancerCard.innerHTML = `
          <div class="card-header">
            <div class="member-header">
              <div class="member-info">
                <div class="avatar">
                  <img src="${freelancer.avatar}" alt="${freelancer.name}">
                </div>
                <div>
                  <h3 class="card-title">${freelancer.name}</h3>
                  <p class="card-description">${freelancer.role}</p>
                </div>
              </div>
              <span class="badge badge-secondary">
                <i data-lucide="star" class="badge-icon"></i>
                ${freelancer.rating}
              </span>
            </div>
          </div>
          <div class="card-content">
            <div class="badge-container">
              ${freelancer.skills.map(skill => `<span class="badge badge-outline">${skill}</span>`).join('')}
            </div>
            <div style="font-size: 0.875rem; font-weight: 500;">
              ${freelancer.hourlyRate}
            </div>
          </div>
          <div class="card-footer">
            <div class="button-group">
              <button class="btn btn-outline btn-sm">
                <i data-lucide="message-square" class="btn-icon"></i> Contact
              </button>
              <button class="btn btn-primary btn-sm">
                <i data-lucide="briefcase" class="btn-icon"></i> Hire
              </button>
            </div>
          </div>
        `;
        
        freelancersContainer.appendChild(freelancerCard);
      });
      
      // Initialize icons in dynamically added content
      lucide.createIcons();
    }
    
    // Load freelancers list
    const freelancersList = document.getElementById('freelancers-list');
    if (freelancersList) {
      const freelancers = [
        {
          id: 1,
          name: "Daniel Lee",
          role: "Full Stack Developer",
          skills: ["React", "Node.js", "MongoDB", "AWS"],
          hourlyRate: "$65/hr",
          location: "Remote (GMT+8)",
          bio: "Full stack developer with 6 years of experience building scalable web applications.",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.9
        },
        {
          id: 2,
          name: "Jessica Kim",
          role: "UI/UX Designer",
          skills: ["Figma", "Adobe XD", "Sketch", "User Research"],
          hourlyRate: "$55/hr",
          location: "Remote (GMT-5)",
          bio: "Designer specializing in creating intuitive and beautiful user interfaces.",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.8
        },
        {
          id: 3,
          name: "Marcus Johnson",
          role: "Mobile Developer",
          skills: ["React Native", "Flutter", "iOS", "Android"],
          hourlyRate: "$70/hr",
          location: "Remote (GMT-8)",
          bio: "Mobile developer with expertise in cross-platform and native app development.",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.7
        },
        {
          id: 4,
          name: "Priya Sharma",
          role: "Digital Marketer",
          skills: ["SEO", "Content Marketing", "Social Media", "Analytics"],
          hourlyRate: "$45/hr",
          location: "Remote (GMT+5:30)",
          bio: "Marketing specialist with a focus on growth strategies for startups.",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.6
        }
      ];
      
      // Render freelancers
      freelancers.forEach(freelancer => {
        const freelancerProfile = document.createElement('div');
        freelancerProfile.className = 'freelancer-profile';
        
        freelancerProfile.innerHTML = `
          <div class="freelancer-header">
            <div class="freelancer-avatar">
              <img src="${freelancer.avatar}" alt="${freelancer.name}">
            </div>
            <div class="freelancer-info">
              <h3 class="freelancer-name">${freelancer.name}</h3>
              <p class="freelancer-role">${freelancer.role}</p>
              <div class="freelancer-rating">
                <i data-lucide="star" style="width: 0.75rem; height: 0.75rem; color: var(--primary); fill: var(--primary);"></i>
                <span>${freelancer.rating}</span>
              </div>
            </div>
          </div>
          <p class="freelancer-bio">${freelancer.bio}</p>
          <p style="font-size: 0.75rem; color: var(--muted-foreground); margin-bottom: 0.75rem;">${freelancer.location}</p>
          <div class="freelancer-skills">
            ${freelancer.skills.map(skill => `<span class="badge badge-outline">${skill}</span>`).join('')}
          </div>
          <div class="freelancer-rate">
            ${freelancer.hourlyRate}
          </div>
          <div class="freelancer-actions">
            <button class="btn btn-outline">
              <i data-lucide="message-square" class="btn-icon"></i> Contact
            </button>
            <button class="btn btn-primary">
              <i data-lucide="briefcase" class="btn-icon"></i> Hire
            </button>
          </div>
        `;
        
        freelancersList.appendChild(freelancerProfile);
      });
      
      // Initialize icons in dynamically added content
      lucide.createIcons();
    }
    
    // AI Suggestions functionality
    const generateAiBtn = document.getElementById('generate-ai-btn');
    const aiSuggestionsContainer = document.getElementById('ai-suggestions-container');
    const applySuggestionsBtn = document.getElementById('apply-suggestions-btn');
    
    if (generateAiBtn && aiSuggestionsContainer && applySuggestionsBtn) {
      generateAiBtn.addEventListener('click', function() {
        const description = document.getElementById('description').value;
        
        if (!description) {
          alert('Please enter a description of your idea first.');
          return;
        }
        
        // Show loading state
        generateAiBtn.disabled = true;
        generateAiBtn.innerHTML = '<i data-lucide="loader" class="btn-icon animate-spin"></i> Generating...';
        lucide.createIcons();
        
        // Simulate AI response delay
        setTimeout(() => {
          // Clear previous suggestions
          aiSuggestionsContainer.innerHTML = '';
          
          // Sample AI suggestions
          const suggestions = [
            "Consider focusing on a specific niche within your target market to establish a strong initial user base.",
            "You might want to explore partnerships with existing platforms to leverage their user base.",
            "Think about how you can incorporate a freemium model to attract users while monetizing premium features.",
            "Consider adding a feature that allows users to track their progress and milestones."
          ];
          
          // Add suggestions to container
          suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = suggestion;
            aiSuggestionsContainer.appendChild(suggestionItem);
          });
          
          // Enable apply button
          applySuggestionsBtn.disabled = false;
          
          // Reset generate button
          generateAiBtn.disabled = false;
          generateAiBtn.innerHTML = '<i data-lucide="sparkles" class="btn-icon"></i> Get AI Suggestions';
          lucide.createIcons();
        }, 2000);
      });
      
      applySuggestionsBtn.addEventListener('click', function() {
        alert('Suggestions applied to your idea!');
      });
    }
    
    // Login functionality
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
      loginButton.addEventListener('click', function() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
          alert('Please enter both email and password.');
          return;
        }
        
        // Show loading state
        loginButton.disabled = true;
        loginButton.innerHTML = '<i data-lucide="loader" class="btn-icon animate-spin"></i> Logging in...';
        lucide.createIcons();
        
        // Simulate login delay
        setTimeout(() => {
          navigateTo('dashboard');
          
          // Reset button
          loginButton.disabled = false;
          loginButton.innerHTML = 'Log In';
        }, 1500);
      });
    }
    
    // Signup functionality
    const signupNextBtn = document.getElementById('signup-next-btn');
    const signupPrevBtn = document.getElementById('signup-prev-btn');
    const signupSubmitBtn = document.getElementById('signup-submit-btn');
    const signupStep1 = document.getElementById('signup-step-1');
    const signupStep2 = document.getElementById('signup-step-2');
    
    if (signupNextBtn && signupPrevBtn && signupSubmitBtn && signupStep1 && signupStep2) {
      signupNextBtn.addEventListener('click', function() {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        if (!name || !email || !password || !confirmPassword) {
          alert('Please fill in all fields.');
          return;
        }
        
        if (password !== confirmPassword) {
          alert('Passwords do not match.');
          return;
        }
        
        // Show step 2
        signupStep1.style.display = 'none';
        signupStep2.style.display = 'block';
        
        // Update buttons
        signupNextBtn.style.display = 'none';
        signupPrevBtn.style.display = 'block';
        signupSubmitBtn.style.display = 'block';
        
        // Update step indicator
        document.querySelector('.auth-step[data-step="1"]').classList.remove('active');
        document.querySelector('.auth-step[data-step="2"]').classList.add('active');
      });
      
      signupPrevBtn.addEventListener('click', function() {
        // Show step 1
        signupStep1.style.display = 'block';
        signupStep2.style.display = 'none';
        
        // Update buttons
        signupNextBtn.style.display = 'block';
        signupPrevBtn.style.display = 'none';
        signupSubmitBtn.style.display = 'none';
        
        // Update step indicator
        document.querySelector('.auth-step[data-step="1"]').classList.add('active');
        document.querySelector('.auth-step[data-step="2"]').classList.remove('active');
      });
      
      signupSubmitBtn.addEventListener('click', function() {
        const role = document.getElementById('signup-role').value;
        const interests = document.getElementById('signup-interests').value;
        const experience = document.getElementById('signup-experience').value;
        const terms = document.getElementById('terms').checked;
        
        if (!role || !interests || !experience || !terms) {
          alert('Please fill in all fields and accept the terms.');
          return;
        }
        
        // Show loading state
        signupSubmitBtn.disabled = true;
        signupSubmitBtn.innerHTML = '<i data-lucide="loader" class="btn-icon animate-spin"></i> Creating...';
        lucide.createIcons();
        
        // Simulate signup delay
        setTimeout(() => {
          navigateTo('dashboard');
          
          // Reset form
          document.getElementById('signup-form').reset();
          signupStep1.style.display = 'block';
          signupStep2.style.display = 'none';
          signupNextBtn.style.display = 'block';
          signupPrevBtn.style.display = 'none';
          signupSubmitBtn.style.display = 'none';
          document.querySelector('.auth-step[data-step="1"]').classList.add('active');
          document.querySelector('.auth-step[data-step="2"]').classList.remove('active');
          
          // Reset button
          signupSubmitBtn.disabled = false;
          signupSubmitBtn.innerHTML = 'Create Account';
        }, 1500);
      });
    }
  });

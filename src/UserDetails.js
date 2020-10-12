import image from './assets/JeremyWang.png'

export default {
    pic: image,
    name: 'Jeremy Wang',
    titles: ['Software Engineer', 'Web Dev', 'Triathlon Runner', 'Coffee Mania', 'Book Worm'],
    resumeLink: 'https://jeremy-he-codes.github.io/resume-jeremy.pdf',
    projects: [
        {
            image: '/images/pluginseo.png',
            title: 'Top-rated Shopify SEO App',
            date: 'Feb 2019 - Aug 2020',
            description: 'Played a pivotal role in the betterment of top-rated Shopify apps; Plug-in-SEO | Plug-in-Backup'
        },
        {
            image: '/images/ustrive.png',
            title: 'Virtual Mentoring Platform for Students',
            date: 'Jan 2018 - Feb 2020',
            description: 'Volunteered for the full-stack Javascript developer position, worked 5 hours a week for 2 years to enhance and maintain the virtual mentoring platform'
        },
        {
            image: '/images/polco.jpg',
            title: 'Civic Engagement Platform for Municipal Policy-making',
            date: 'Sep 2016 - Nov 2018',
            description: 'Contributed to the wider and more transparent citizen engagement in metropolitan policy-making'
        }
    ],
    skills: {
        languages: ['Ruby', 'Javascript'],
        fandls: ['Ruby on Rails', 'ReactJS', 'GraphQL', 'Firebase', 'Git', 'D3', 'Shopify', 'Typescript', 'ElasticSearch', 'React Native'],
        deployment: ['Heroku', 'Amazon Cloud EC2', 'Firebase', 'Google App Engine']
    }
}

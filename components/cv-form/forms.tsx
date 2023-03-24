import styles from "..header/header.module.css"
import ContactInfo from './contacts'
import Education from './education'
import Experience from './experience'
import Languages from './lang'
import Links from './links'
import ProfileIntro from './profile-intro'
import ProfilePicture from './profile-pic'
import Skills from './tech-skills'

export default function Form() {
    return (
        <div>
            <p>Please fill in the form to create the CV</p>
            <ProfilePicture />
            <ProfileIntro />
            <ContactInfo />
            <Links />
            <Skills />
            <Languages />
            <Education />
            <Experience />
        </div>
    )
}
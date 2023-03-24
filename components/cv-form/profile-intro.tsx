export default function ProfileIntro() {
    return (
        <div>
           <label htmlFor="name">Name</label>
           <input type="text" id="name" placeholder="Name" required/>
           <label htmlFor="profileIntro">Profile Introduction</label>
           <textarea id="profileIntro" maxLength={200} required/>
        </div>
    )
}
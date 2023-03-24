export default function ProfilePicture() {
    return (
        <div>
           <label htmlFor="profilepic">Profile picture</label>
           <input type="url" id="profilepic" placeholder="Please Provide a URL" required/>
        </div>
    )
}
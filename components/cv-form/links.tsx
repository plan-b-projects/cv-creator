export default function Links() {
    return (
        <div>
           <label htmlFor="linkedIn">LinkedIn</label>
           <input type="url" id="linkedIn" placeholder="LinkedIn link" />
           <label htmlFor="github">GitHub</label>
           <input type="url" id="github" placeholder="GitHub link" />
           <label htmlFor="website">Other website</label>
           <input type="url" id="website" placeholder="Other website link" />
        </div>
    )
}
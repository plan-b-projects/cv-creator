export default function ContactInfo() {
    return (
        <div>
           <label htmlFor="location">Location</label>
           <input type="text" id="location" placeholder="ex. Stockholm, Sweden" required/>
           <label htmlFor="email">Email</label>
           <input type="email" id="email" placeholder="luca@luega.com" required/>
           <label htmlFor="number">Email</label>
           <input type="number" id="number" placeholder="0712345678" required/>
        </div>
    )
}
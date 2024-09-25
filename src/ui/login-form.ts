export const loginFormUI = (): HTMLDivElement => {
  const div = document.createElement("div");

  div.innerHTML = `
    <div>
      
      <h1>Shield Pass</h1>
      <form>
        <div>
          <label>Email</label>
          <input type="email" required name="email" placeholder="Your Email" /> 
        </div>
        <div>
          <label>Password</label>
          <input type="password" required name="password" placeholder="Your Password" /> 
        </div>
        <button type="submit">Submit</button>
        <button type="button" class="sp-logout-btn" >Log Out</button>
      </form>
    </div>
  `;

  return div;
};

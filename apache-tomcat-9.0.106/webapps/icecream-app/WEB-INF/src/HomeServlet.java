import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class HomeServlet extends HttpServlet {
  private static final long serialVersionUID = 100L;  // Used for serialization since `HttpServlet` implements `Serializable`. 

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    out.println("<html>");
    out.println("<head><title>My Icecream Shop!</title></head>");
    out.println("<body>");
    out.println("<h1>Welcome To My Ice Cream Parlor</h1>");
    out.println("</body></html>");
  }
}
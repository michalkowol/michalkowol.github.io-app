public class Test {
 
    private String type;
    private String password;
 
    public Test(String type, String password) {
        this.type = type;
        this.password = password;
    }
     
    public String getPassword() {
        return password;
    }
     
    public String getType() {
        return type;
    }
}
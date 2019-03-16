package cs490.com.login;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity_Login extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main__login);
    }

    public void login(View a) {
        TextView username = (TextView) findViewById(R.id.textView);
        TextView password = (TextView) findViewById(R.id.textView2);
        String userS = username.getText().toString();
        String passwordS = password.getText().toString();

        if (!userS.equals("") | !passwordS.equals("")) {
            Toast.makeText(getApplicationContext(), "Invalid Username/Password", Toast.LENGTH_SHORT).show();
        } else {
            Intent redirect = new Intent(MainActivity_Login.this, MainActivity.class);
            startActivity(redirect);
        }
    }
}
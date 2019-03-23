package cs490.com.pizza;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Intent;
import android.view.Gravity;
import android.widget.TextView;

public class order_summary extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order_summary);
        Intent intent = getIntent();
        String Order = intent.getExtras().getString("Order");

        TextView textView = new TextView(this);
        textView.setTextSize(15);
        textView.setText(Order);
        textView.setGravity(Gravity.CENTER);
        // Set the text view as the activity layout
        setContentView(textView);
    }
}

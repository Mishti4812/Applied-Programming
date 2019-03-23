package cs490.com.pizza;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    private static final String MAIN_ACTIVITY_TAG = "MainActivity";
    final int PIZZA_PRICE = 8;
    final int PEPPERONI_PRICE = 1;
    final int SAUSAGE_PRICE = 1;
    final int CHICKEN_PRICE = 1;
    final int GREEN_PEPPER_PRICE = 1;
    final int ONIONS_PRICE = 1;
    final int OLIVES_PRICE = 1;
    final int MUSHROOMS_PRICE = 1;
    final int PINEAPPLE_PRICE = 1;
    int quantity = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    /**
     * This method is called when the order button is clicked.
     */
    // takes u to new activity/screen
    public void submitOrder(View view) {

        // get user input
        EditText userInputNameView = (EditText) findViewById(R.id.user_input);
        String userInputName = userInputNameView.getText().toString();

        // check if Pepperoni is selected
        CheckBox pepperoni = (CheckBox) findViewById(R.id.pepperoni_checked);
        boolean hasPepperoni = pepperoni.isChecked();

        // check if Sausage is selected
        CheckBox sausage = (CheckBox) findViewById(R.id.sausage_checked);
        boolean hasSausage = sausage.isChecked();

        // check if Chicken is selected
        CheckBox chicken = (CheckBox) findViewById(R.id.chicken_checked);
        boolean hasChicken = chicken.isChecked();

        // check if Green Pepper is selected
        CheckBox greenPepper = (CheckBox) findViewById(R.id.green_pepper_checked);
        boolean hasGreenPepper = greenPepper.isChecked();

        // check if Onions is selected
        CheckBox onions = (CheckBox) findViewById(R.id.onions_checked);
        boolean hasOnions = onions.isChecked();

        // check if Olives is selected
        CheckBox olives = (CheckBox) findViewById(R.id.olives_checked);
        boolean hasOlives = olives.isChecked();

        // check if Mushrooms is selected
        CheckBox mushrooms = (CheckBox) findViewById(R.id.mushrooms_checked);
        boolean hasMushrooms = mushrooms.isChecked();

        // check if Pineapple is selected
        CheckBox pineapple = (CheckBox) findViewById(R.id.pineapple_checked);
        boolean hasPineapple = pineapple.isChecked();

        // calculate and store the total price
        float totalPrice = calculatePrice(hasPepperoni, hasSausage, hasChicken, hasGreenPepper, hasOnions, hasOlives, hasMushrooms, hasPineapple);

        // create and store the order summary
        String orderSummaryMessage = createOrderSummary(userInputName, hasPepperoni, hasSausage, hasChicken, hasGreenPepper, hasOnions, hasOlives, hasMushrooms, hasPineapple, totalPrice);

        Intent i = new Intent(this, order_summary.class);
        String summary = createOrderSummary(userInputName, hasPepperoni, hasSausage, hasChicken, hasGreenPepper, hasOnions, hasOlives, hasMushrooms, hasPineapple, totalPrice);
        i.putExtra("Order", summary);
        startActivity(i);

    }

    // send the email
    public void submitOrder2(View view) {

        // get user input
        EditText userInputNameView = (EditText) findViewById(R.id.user_input);
        String userInputName = userInputNameView.getText().toString();

        // check if Pepperoni is selected
        CheckBox pepperoni = (CheckBox) findViewById(R.id.pepperoni_checked);
        boolean hasPepperoni = pepperoni.isChecked();

        // check if Sausage is selected
        CheckBox sausage = (CheckBox) findViewById(R.id.sausage_checked);
        boolean hasSausage = sausage.isChecked();

        // check if Chicken is selected
        CheckBox chicken = (CheckBox) findViewById(R.id.chicken_checked);
        boolean hasChicken = chicken.isChecked();

        // check if Green Pepper is selected
        CheckBox greenPepper = (CheckBox) findViewById(R.id.green_pepper_checked);
        boolean hasGreenPepper = greenPepper.isChecked();

        // check if Onions is selected
        CheckBox onions = (CheckBox) findViewById(R.id.onions_checked);
        boolean hasOnions = onions.isChecked();

        // check if Olives is selected
        CheckBox olives = (CheckBox) findViewById(R.id.olives_checked);
        boolean hasOlives = olives.isChecked();

        // check if Mushrooms is selected
        CheckBox mushrooms = (CheckBox) findViewById(R.id.mushrooms_checked);
        boolean hasMushrooms = mushrooms.isChecked();

        // check if Pineapple is selected
        CheckBox pineapple = (CheckBox) findViewById(R.id.pineapple_checked);
        boolean hasPineapple = pineapple.isChecked();

        // calculate and store the total price
        float totalPrice = calculatePrice(hasPepperoni, hasSausage, hasChicken, hasGreenPepper, hasOnions, hasOlives, hasMushrooms, hasPineapple);

        // create and store the order summary
        String orderSummaryMessage = createOrderSummary(userInputName, hasPepperoni, hasSausage, hasChicken, hasGreenPepper, hasOnions, hasOlives, hasMushrooms, hasPineapple, totalPrice);


        Intent email = new Intent(Intent.ACTION_SEND_MULTIPLE);
        email.setType("text/plain");
        email.putExtra(Intent.EXTRA_EMAIL, new String[]{userInputName});
        email.putExtra(Intent.EXTRA_SUBJECT, "Your Pizza Order Has Been Received!");
        email.putExtra(Intent.EXTRA_TEXT, "Sent From Pizza Buddy\n\n" + createOrderSummary(userInputName, hasPepperoni, hasSausage, hasChicken, hasGreenPepper, hasOnions, hasOlives, hasMushrooms, hasPineapple, totalPrice));
        startActivity(email);
    }

    private String boolToString(boolean bool) {
        return bool ? "yes" : "no";
    }

    private String createOrderSummary(String userInputName, boolean hasPepperoni, boolean hasSausage, boolean hasChicken, boolean hasGreenPepper, boolean hasOnions, boolean hasOlives, boolean hasMushrooms, boolean hasPineapple, float price) {
        String orderSummaryMessage =
                    "Email " + userInputName + "\n" +
                    "Add Pepperoni?" + boolToString(hasPepperoni) + "\n" +
                    "Add Sausage?" + boolToString(hasSausage) + "\n" +
                    "Add Chicken?" + boolToString(hasChicken) + "\n" +
                    "Add Green Pepper?" + boolToString(hasGreenPepper) + "\n" +
                    "Add Onions?" + boolToString(hasOnions) + "\n" +
                    "Add Olives?" + boolToString(hasOlives) + "\n" +
                    "Add Mushrooms?" + boolToString(hasMushrooms) + "\n" +
                    "Add Pineapple?" + boolToString(hasPineapple) + "\n\n" +
                    "Total" + calculatePrice(hasPepperoni, hasSausage, hasChicken, hasGreenPepper, hasOnions, hasOlives, hasMushrooms, hasPineapple) + "\n" +
                    "Thank you!";
            return orderSummaryMessage;
        }

    /**
     * Method to calculate the total price
     *
     * @return total Price
     */
    private float calculatePrice(boolean hasPepperoni, boolean hasSausage, boolean hasChicken, boolean hasGreenPepper, boolean hasOnions, boolean hasOlives, boolean hasMushrooms, boolean hasPineapple) {
        int basePrice = PIZZA_PRICE;
        if (hasPepperoni) {
            basePrice += PEPPERONI_PRICE;
        }
        if (hasSausage) {
            basePrice += SAUSAGE_PRICE;
        }
        if (hasChicken) {
            basePrice += CHICKEN_PRICE;
        }
        if (hasGreenPepper) {
            basePrice += GREEN_PEPPER_PRICE;
        }
        if (hasOnions) {
            basePrice += ONIONS_PRICE;
        }
        if (hasOlives) {
            basePrice += OLIVES_PRICE;
        }
        if (hasMushrooms) {
            basePrice += MUSHROOMS_PRICE;
        }
        if (hasPineapple) {
            basePrice += PINEAPPLE_PRICE;
        }
        return quantity * basePrice;
    }

    /**
     * This method displays the given quantity value on the screen.
     */
    private void display(int number) {
        TextView quantityTextView = (TextView) findViewById(R.id.quantity_text_view);
        quantityTextView.setText("" + number);
    }

    /**
     * This method increments the quantity of coffee cups by one
     *
     * @param view on passes the view that we are working with to the method
     */

    public void increment(View view) {
        if (quantity < 100) {
            quantity = quantity + 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select less than one hundred cups of coffee");
            Context context = getApplicationContext();
        }
    }

    /**
     * This method decrements the quantity of coffee cups by one
     *
     * @param view passes on the view that we are working with to the method
     */
    public void decrement(View view) {
        if (quantity > 1) {
            quantity = quantity - 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select atleast one cup of coffee");
            Context context = getApplicationContext();
        }
    }
}
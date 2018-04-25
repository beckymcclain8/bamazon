# Bamazon

Bamazon is a CLI node application.  The user will choose between 2 different files: bamazonCustomer.js or bamazonManager.js.

# Bamazon Customer

If the user would like to act as a customer, they will get started by typing 'node bamazonCustomer.js' in their terminal.  This will prompt them with a list of items for sale.  

![Bamazon Product List](/images/bcproducts.JPG)
Format: ![Alt Text](url)

After the user chooses the item number they would like to purchase the app will then prompt them to answer how many of that item they would like to purchase.  Once they enter a number the app will place the order and give them their total.  

![Bamazon Purchase and Total](/images/bctotal.JPG)
Format: ![Alt Text](url)

Please click this link to see a video of the app running: 
[bamazonCustomer Video](https://drive.google.com/file/d/1wkf53l8jxiUKf-f2MFpPFiefMwJNOOLA/view)



# Bamazon Manager

If the user would like to act as a store manager, they will get started by typing 'node bamazonManager.js' in their terminal.  This will prompt them with four options to select from.

![Bamazon Manager Menu](/images/bmmenu.JPG)
Format: ![Alt Text](url)

If the user chooses the first option to view the products, they will indeed see a list of ids, products, prices, and the quantity of each item.  They will also be prompted with a question on whether or not they would like to return to the main menu.

![Bamazon Manager Product List](/images/bmProductList.JPG)
Format: ![Alt Text](url)

If the user chooses the second option the app will run a report to see if there are any products that have a quantity less than 5.  If so, it will list the items.  Again, it will prompt the user to see if they would like to return to the main menu.

![Bamazon Manager Low Inventory List](/images/bmLowInventory.JPG)
Format: ![Alt Text](url)

If the user chooses the third option to add to inventory, the application will check to see what items have less than 5 items remaining in stock and then ask the user if they would like to add more inventory.  If the user selects 'yes' then the app will restock all of the items that are low.  It will then ask them if they would like to return to the main menu.

![Bamazon Manager Update Inventory](/images/bmUpdateInventory.JPG)
Format: ![Alt Text](url)

The last option allows the user to input a new product to be sold.  The app asks a series of questions and then uses the answers to add the product to the mySQL database.  This product will now show up when the user, or customer, run a product list.  

![Bamazon Manager New Product](/images/bmNewProduct.JPG)
Format: ![Alt Text](url)

Validation has been added to the prompts to ensure that the user provides accurate information.

![Bamazon Manager Validation](/images/bmValidation.JPG)
Format: ![Alt Text](url)


Please click this link to see a video of the bamazonManager.js app working: 
[bamazonManager Video](https://drive.google.com/file/d/1wkf53l8jxiUKf-f2MFpPFiefMwJNOOLA/view)


This app was created and is maintained by Becky McClain.
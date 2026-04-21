

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    user_id = session["user_id"]



    products = db.execute("SELECT symbol, name, price, SUM(shares) AS Shares_total FROM Processes WHERE user_id = ? GROUP BY symbol", user_id)
    money_cash = db.execute("SELECT cash FROM users WHERE id = ?", user_id)[0]["cash"]

    total = money_cash


    for product in products:
        total += product["price"] * product["Shares_total"]

    return render_template("index.html", products=products, money_cash=money_cash, total=total, usd=usd)



@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""

    if request.method == "POST":
       symbol = request.form.get("symbol")
       product = lookup(symbol)

       if not symbol:
           return apology("Not symbol")
       if not product:
           return apology("Not item")
       try:
           shares = int(request.form.get("shares"))
       except:
           return apology("not valid share")

       if shares <= 0:
           return apology("The shares must not be negative")

       user_id = session["user_id"]
       cash = db.execute("SELECT cash FROM users WHERE id = ?", user_id)[0]["cash"]

       product_name = product["name"]
       product_price = product["price"]
       total_price = product_price * shares

       if cash < total_price:
           return apology("Cash isn't enough")

       else:
           db.execute("UPDATE users SET cash = ? WHERE id = ?", cash - total_price, user_id)
           db.execute("INSERT INTO Processes (user_id, name, shares, price, type, symbol) VALUES (?, ?, ?, ?, ?, ?)",
                      user_id, product_name, shares, product_price, 'buy', symbol )

       return redirect('/')
    else:
        return render_template("buy.html")





@app.route("/history")
@login_required
def history():
    """Show history of transactions"""
    return apology("TODO")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""

    if request.method == "POST":
        symbol = request.form.get("symbol")

        if not symbol:
            return apology("Input something")

        product = lookup(symbol)


        if not product:
            return apology("Invalid symbol")

        return render_template("quoted.html", product=product, usd_dollar_sign=usd)
    else:
        return render_template("quote.html")






@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    session.clear()

    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        confirmation = request.form.get('confirmation')

        if username == "":
            return apology("Fill your username")
        elif password == "":
            return apology("Fill your password")
        else:
            if not confirmation:
                return apology("Fill your password")

        if confirmation != password:
            return apology("Confirmation is not the same with the password")

        hash = generate_password_hash(password)

        try:
            db.execute("INSERT INTO users (username, hash) VALUES (?, ?)" , username, hash)
            return redirect("/")
        except:
            return apology("Username used")

    else:
        return render_template("register.html")





@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""

    if request.method == "POST":
        user_id = session["user_id"]
        symbol = request.form.get('symbol').upper()
        shares = request.form.get('shares')

        search_symbol = lookup(symbol)


        if not symbol:
            return apology("Select symbol option")
        if not search_symbol:
            return apology("Not in the option")
        if not shares:
            return apology("Baby your words po :<")



        try:
            shares = int(request.form.get('shares'))
        except:
            return apology('Shares should be an  Integer')

        if shares <= 0:
            return apology('Share should not be negative')


        product_name = search_symbol["name"]
        product_price = search_symbol["price"]
        total_return = shares * product_price

        shares_owned_db = db.execute("SELECT shares FROM Processes WHERE user_id = ? AND symbol = ? GROUP BY symbol", user_id, symbol)[0]["shares"]
        cash_owned_db = db.execute("SELECT cash FROM users WHERE id = ?", user_id)[0]["cash"]

        if shares_owned_db < shares:
            return apology("Not enough owned shares")

        db.execute("UPDATE users SET cash = ? WHERE id = ?", cash_owned_db + total_return, user_id)
        db.execute("INSERT INTO Processes (user_id, name, shares, price, type, symbol) VALUES (?, ?, ?, ?, ?, ?)",
                      user_id, product_name, -shares, product_price, 'sell', symbol )

        return redirect('/')


    else:
        user_id = session["user_id"]
        symbols = db.execute("SELECT symbol FROM Processes WHERE user_id = ? GROUP BY symbol", user_id)
        return render_template("sell.html", symbols=symbols)



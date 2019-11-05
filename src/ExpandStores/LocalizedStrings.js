import LocalizedStrings from 'react-native-localization';
import {Text} from "react-native";
import React from "react";

let strings = new LocalizedStrings({
    en:{
        connectionError:"there is no internet connection",
        tryAgain:"Try Again",
        home:"Home",
        BAG:'BAG',
        myAccount:"My Account",
        wishList:"Wish List",
        Cart:"Cart",
        shoppingCart:"Shopping Bag",
        categories:"Categories",
        aboutus:"About Us",
        contactus:"Contact Us",
        editProfile: 'Edit Profile',
        Profile: 'PROFILE',
        logOut:"LOGOUT",
        switchLanguage:"العربيه",
        subCategoryTitle:"Sub Categories",
        categoryProductsTitle:"Products",
        productDetailsTitle:"Product Details",
        relatedProductsTitle:"Related Products",
        productDetailsLabel:"Details",
        AddtoCartButton:"Add To Cart",
        addtobag: 'ADD TO BAG',
        AddtoWishListButton:"Add To Wish List",

        AllCategories: "All Categories",

        firstNamePlaceHolder:"First Name",
        lastNamePlaceHolder:"Last Name",
        EmailPlaceHolder:"Email",
        PasswordPlaceHolder:"Password",
        PasswordConfirmPlaceHolder:"Confirm Password",
        PhoneNumberPlaceHolder:"Phone Number",

        LoginButton:"LOGIN",
        optionalText:"OR YOU CAN ",
        singinWithFaceBookText:"SIGN WITH FACEBOOK ",
        singinWithGoogleText:"SIGN WITH GOOGLE ",
        forgetPasswordText:"Forget Password",
        skipToHomeScreen:"Go To Home Screen",
        registerNewAccount:"Create New Account",
        Signup: 'Sign Up',
        SignIn: 'Sign In',

      


        // loading:"Loading",
        loading:"",
        homeBottomLabel: "Home",
        searchBottomLabel: "Search",
        cartBottomLabel: "My Cart",
        accountBottomLabel: "My Account",






        firstNameErrorMessage:"First Name Is Empty Or Less than 4 characters",
        lastNameErrorMessage:"Last Name Is Empty Or Less than 4 characters",
        EmailErrorMessage:"Email Is Empty is wrong fromate",
        PasswordErrorMessage:"Password can't be less than 6 characters",
        PasswordConfirmErrorMessage:"Passwords is not match",
        PhoneErrorMessage:"Phone can't be Less Than 6 characters",
        LoginFaildErrorMessage:"Error In Email Or Password",


        backButtonLabel:"Back",
        SHOP: 'SHOP',

        moreButton:"Discover More",

        productDetails:"Product Details",

        AddedToCart : "Added To Cart ",

        addToWishListLoggedinMessage:"Added To Wish List",
        addToWishListLoggedOutMessage:"Please Sign In First",
        ProductQuantity:"Quantity",

        OrderList: "Order List",


        CartItemPriceLabel:"Price : ",
        CartItemTotalPriceLabel:"Total : ",
        CartItemInStockLabel:"InStock ",
        CartItemNotInStockLabel:"Not InStock",


        CheckOutButtonText:"Check Out",

        CartEmptyText:"Cart Is Empty",
        WishListEmptyText:"WishList Is Empty",
        OrderListEmptyText: 'Order List Is Empty',
        CartEmptyButtonText:"Go To Home Screen",

        ContactUsScreenTitle : "Contact Us",
        ContactUsScreenSocialMediaTitle:"Follow Us",
        Status: "Status",
        Date: "Date",
        products: 'products',
        Total:"Total",
        emptyOptions:"empty Options (Required) *",
        Cancel:"Cancel",
        NoProduct: 'No Product For This Name',
        SearchForProducts:"Search For Products",
        WelcomeText: 'Shop & get updates on new products and sales with our mobile app.',
        components: {
          home: {
            bestSellers: {
              browseAll: "Browse All",
            },
            home: {
              newArrivals: 'New Arrivals',
              featured: 'Featured',
              bestSellers: 'Best Sellers',
            }
          },
          contactUs: {
            title : "Contact Us",
            ShippingAddress: 'Shipping Address',
            OurAddress: 'Our Address',
            emailUs: 'Email Us',
          },
          editProfile: {
            publicProfile: "PUBLIC PROFILE",
            firstName: "First Name",
            firstNamePlaceHolder: "Your first name",
            lastName: "Last Name",
            lastNamePlaceHolder: "Your last name",
            privateDetials: "PRIVATE DETAILS",
            emailLabel: "E-mail Address",
            emailPlaceHolder: "Your email",
            passwordLabel: "password",
            passwordPlaceHolder: "Your password",
          },
          login: {
            emailPlaceHolder: 'someone@example.com',
            passwordPlaceHolder: 'Password',
          },
          orderCard: {
            totalPrice: 'Total ${0}',
            reorder: 'REORDER',
          },
          orderProcedure: {
            checkOutDetials: {
              paymentTitle: "Payment",
              shippingTitle: "Shipping",
              totalTitle: "Total",
            },
            paymentOptions: {
              addNewCard: "Add New Card..."
            },
            shippingDetails: {
              upsArrivalTime: "Arrives in 3-5 days",
              upsPrice: "free",
              fedExArrivalTime: "Arrives tomorrow",
              namePlaceHolder: "Name",
              emailPlaceHolder: "Email",
              addressPlaceHolder: "Address",
              aptPlaceHolder: "Apt.",
              zipCodePlaceHolder: "Zip Code",
              cityPlaceHolder: "city",
              statePlaceHolder: "state",
              countryPlaceHolder: "country",
              countryValue: "United States"
            }
          },
          profile: {
            accountDetailsTitle: "Account Details",
            accountDetialsNavigateScreenTitle: "Edit Profile",
            wishListTitle: "WishList",
            historyTitle: "Order History",
            contactUsTitle: "Contact Us",
            logoutTitle: "Logout",

          },
          shoppingBag: {
            continueTitle: "CONTINUE"
          },
          shoppingBagCard: {
            removeItemTitle: "Remove Item",
            removeItemMessage: "Are you sure you want to remove this item from the cart?",
            removeButtonText: "Remove",
            cancelButtonText: "Cancel",
          }
        },
        screens: {
          editProfileScreen: {
            title: "Edit Profile",
          },
          shoppingBagScreen: {
            title: "Shopping Bag",
          },
          shopCategoryProductGridScreem: {
            title: "Cartegory Grid",
          },
          settingsScreen: {
            title: "Settings",
          },
          orderProcedureScreen: {
            addACardScreen: {
              title: "Add a Card",
              cardInputTitle: "Card",
              cardDatePlaceholder: "MM/YY",
              alert: "Please fill in your card details",
              headerBackButton: "Cancel",
              headerRightButton: "Done",
            },
            checkOutScreen: {
              alertTitle: "Success",
              alertMessage: "Congratulations! Your order has been placed successfully.",
              alertButtonText: "OK",
              title: "Check out",
              checkOutDetialstitle: "Shipping Address",
              footeButton: "Place Order",
            },
            paymentMethodScreen: {
              headerBackButton: "Cancel",
              headerRightButton: "Next",
              title: "Payment Method",
            },
            shippingAddressScreen: {
              headerBackButton: "Cancel",
              headerRightButton: "Next",
              title: "Shipping",
              detailsTitle: "Shipping Address",
            },
            shippingMethodScreen: {
              headerRightButton: "Done",
              title: "Shipping",
              detailsTitle: "Shipping Method",
            },
          }
        }
    },
    ar: {
        connectionError:"لا يوجد اتصال بالانترنت",
        tryAgain:"إعاده المحاوله",
        home:"الرئيسيه",
        myAccount:"حسابي",
        wishList:"المفضله",
        Cart:"السله",
        shoppingCart:"السله",
        categories:"الأقسام",
        aboutus:"من نحن",
        contactus:"اتصل بنا",
        logOut:"تسجيل الخروج",
        switchLanguage:"english",
        subCategoryTitle:"الاقسام الفرعيه",
        categoryProductsTitle:"المنتجات",
        productDetailsTitle:"تفاصيل المنتج",
        relatedProductsTitle:"منتجات مقترحه",
        productDetailsLabel:"التفاصيل",
        AddtoCartButton:"إضافه إلي السله",
        addtobag: "إضافه إلي السله",
        AddtoWishListButton:"إضافه إلي المفضله",
        editProfile: 'تعديل الملف الشخصي',
        Profile: 'الملف الشخصي',
        BAG:"حقيبة تسوق",
        AllCategories: "كل الاقسام",
        SHOP: 'متجر',

        LoginButton:"تسجيل الدخول",
        Signup: 'تسجيل',
        SignIn: 'تسجيل الدخول',

        firstNamePlaceHolder:"الأسم الاول",
        lastNamePlaceHolder:"الأسم الاخير",
        EmailPlaceHolder:"البريد الإلكتروني",
        PasswordPlaceHolder:"كلمه السر",
        PasswordConfirmPlaceHolder:"تأكيد كلمه السر",
        PhoneNumberPlaceHolder:"رقم الهاتف ",



        optionalText:"او يمكنك",
        singinWithFaceBookText:"تسجيل الدخول بالفيسبوك ",
        singinWithGoogleText:"تسجيل الدخول بجوجل",
        forgetPasswordText:"نسيت كلمه السر",
        skipToHomeScreen:"الصفحه الرئيسيه",
        registerNewAccount:"تسجيل حساب جديد",
        Cancel:"إلغاء",
        NoProduct: 'لا يوجد منتج لهذا الاسم',
        SearchForProducts:"ابحث عن المنتجات",



        // loading:"جاري تحميل البيانات",
        loading:"",
        homeBottomLabel: "الرئيسيه",
        searchBottomLabel: "البحث",
        cartBottomLabel: "السله",
        accountBottomLabel: "حسابي",
        OrderList: 'لائحة الطلبات',


        firstNameErrorMessage:"الاسم الاول خالي او اقل من ٤ احرف",
        lastNameErrorMessage:"الاسم الاخير خالي او اقل من ٤ احرف",
        EmailErrorMessage:"الإيميل خالي و خطأ",
        PasswordErrorMessage:"كلمه السر لا يمكن ان تكون اقل من ٦ احرف او ارقام",
        PasswordConfirmErrorMessage:"تأكيد كلمه السر خطأ",
        PhoneErrorMessage:"رقم الهاتف لايمكن ان يكون اقل من ٦ ارقام",

        LoginFaildErrorMessage:"خطأ في الايميل او كلمه السر",


        backButtonLabel:"رجوع",

        moreButton:"المزيد",
        productDetails:"تفاصيل المنتج",


        addToWishListLoggedinMessage:"تمت الاضافه للمفضله",
        addToWishListLoggedOutMessage:"من فضلك سجل الدخول اولا",
        ProductQuantity:"الكميه",


        CartItemPriceLabel:"السعر : ",
        CartItemTotalPriceLabel:"السعر الاجمالي : ",
        CartItemInStockLabel:"متوفر ",
        CartItemNotInStockLabel:"غير متوفر ",
        CheckOutButtonText:"المتابعه للشراء",

        CartEmptyText:"السله فارغه",
        WishListEmptyText:"قائمة الرغبات فارغة",
        OrderListEmptyText: 'قائمة الطلبات فارغة',
        CartEmptyButtonText:"الذهاب للصفحه الرئيسيه",

        ContactUsScreenTitle : "اتصل بنا",

        ContactUsScreenSocialMediaTitle:"تابعنا",
        Status: "الحالة",
        Date: "تاريخ",
        products: 'منتجات',
        Total:"مجموع",
        emptyOptions:"خيارات فارغة (مطلوب) *",
        WelcomeText: 'تسوق واحصل على تحديثات حول المنتجات الجديدة والمبيعات من خلال تطبيق الجوّال.',
        ShippingAddress: 'عنوان التوصيل',
        OurAddress: 'العنوان',
      emailUs: 'راسلنا',
      components: {
        home: {
          bestSellers: {
            browseAll: "تصفح الكل",
          },
          home: {
            newArrivals: 'اتى حديثا',
            featured: 'المتميز',
            bestSellers: 'الاكثر مبيعا',
          }
        },
        contactUs: {
          title : "تواصل معانا",
          ShippingAddress: 'عنوان الشحن',
          OurAddress: 'عنواننا',
          emailUs: 'راسلنا',
        },
        editProfile: {
          publicProfile: "الحساب العام",
          firstName: "الاسم الاول",
          firstNamePlaceHolder: "اسمك الاول",
          lastName: "الاسم الاخير",
          lastNamePlaceHolder: "اسم عائلتك",
          privateDetials: "تفاصيل خاصة",
          emailLabel: "البريد الالكتروني",
          emailPlaceHolder: "بريدك الالكتروني",
          passwordLabel: "كلمة المرور",
          passwordPlaceHolder: "كلمة المرور الخاصة بك",
        },
        login: {
          emailPlaceHolder: 'someone@example.com',
          passwordPlaceHolder: "كلمة المرور",
        },
        orderCard: {
          totalPrice: 'المجموع ${0}',
          reorder: 'اعادة الطلب',
        },
        orderProcedure: {
          checkOutDetials: {
            paymentTitle: "الدفع",
            shippingTitle: "الشحن",
            totalTitle: "المجموع",
          },
          paymentOptions: {
            addNewCard: "اضافة كارت جديد"
          },
          shippingDetails: {
            upsArrivalTime: "يصل في خلال 3 الى 5 ايام",
            upsPrice: "مجانا",
            fedExArrivalTime: "يصل غدا",
            namePlaceHolder: "الاسم",
            emailPlaceHolder: "البريد الالكتروني",
            addressPlaceHolder: "العنوان",
            aptPlaceHolder: "الشقة",
            zipCodePlaceHolder: "رمز البريد",
            cityPlaceHolder: "المدينة",
            statePlaceHolder: "المحافظة",
            countryPlaceHolder: "الدولة",
            countryValue: "الولايات المتحدة"
          }
        },
        profile: {
          accountDetailsTitle: "تفاصيل الحساب",
          accountDetialsNavigateScreenTitle: "تعديل الملف الشخصي",
          wishListTitle: "قائمة الرغبات",
          historyTitle: "تاريخ الطلبات",
          contactUsTitle: "تواصل معانا",
          logoutTitle: "تسجيل الخروج",

        },
        shoppingBag: {
          continueTitle: " اكمل التسوق"
        },
        shoppingBagCard: {
          removeItemTitle: "ازالة منتج",
          removeItemMessage: "هل انت متاكد من ازالة هذا المنتج؟",
          removeButtonText: "ازالة",
          cancelButtonText: "الغاء",
        }
      },
      screens: {
        editProfileScreen: {
          title: "تعديل الملف الشخصي",
        },
        shoppingBagScreen: {
          title: "سلة التسوق",
        },
        shopCategoryProductGridScreem: {
          title: "شبككة الفئات",
        },
        settingsScreen: {
          title: "الاعدادات",
        },
        orderProcedureScreen: {
          addACardScreen: {
            title: "اضافة كارت",
            cardInputTitle: "الكارت",
            cardDatePlaceholder: "شش/سس",
            alert: "يرجى ملئ تفاصيل بطاقتك",
            headerBackButton: "الفاء",
            headerRightButton: "انتهاء",
          },
          checkOutScreen: {
            alertTitle: "نجاح",
            alertMessage: "تهانينا! تم تقديم طلبك بنجاح.",
            alertButtonText: "حسنا",
            title: "الدفع",
            checkOutDetialstitle: "عنوان التوصيل",
            footeButton: "اتمام الطلب",
          },
          paymentMethodScreen: {
            headerBackButton: "الغاء",
            headerRightButton: "التالي",
            title: "طريقة الدفع",
          },
          shippingAddressScreen: {
            headerBackButton: "الغاء",
            headerRightButton: "التالي",
            title: "التوصيل",
            detailsTitle: "عنوان التوصيل",
          },
          shippingMethodScreen: {
            headerRightButton: "انتهاء",
            title: "التوصيل",
            detailsTitle: "طريقة التوصيل",
          },
        }
      }
    }
});

export default strings;

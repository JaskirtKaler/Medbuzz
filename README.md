# Medbuzz

![](./imgs/Medbuzz.png)

# Table of Contents

- [Synopsis](#synopsis)
- [Features](#features)
- [Developer Instructions](#developer-instructions)
    - [Dependencies](#dependencies)
    - [Download](#download)
    - [Setup](Setup)
    - [Deployment](#deployment)
        - [Deployment Keys](#deployment-keys)
- [Testing](#testing)
- [Contributors](#contributors)
- [Special Thanks](#special-thanks)

## Synopsis

MedBuzz is an innovative mobile application developed by the Sprint Scripters, aimed at bridging the gap between healthcare workers and recruiters across the United States. This project, guided by the vision of Kamaldeep Singh, Founder and CEO of Radixsol, promises to automate and streamline the healthcare recruitment process, enhancing the efficiency of job searches, application tracking, and communication between candidates and recruiters.

The Radixsol Medical Staffing App envisions a platform where healthcare professionals can effortlessly connect with recruiters, showcasing their qualifications and exploring job opportunities with ease. By integrating advanced features such as online profile creation, a comprehensive job search and filtering system, and real-time notifications, MedBuzz aims to simplify the recruitment process, making it more direct, efficient, and engaging for all stakeholders involved.

## Features

Describe features of the app.
Include any subsections as needed.

## Developer Instructions

**Requirements:**

- Any text editor/IDE,
- Node.js,
- Git Bash,
- and Android Studio and/or XCode.

### Download

1. Navigate to where you want to save the project, open your terminal there and enter the following:

```Bash
Git clone https://github.com/JaskirtKaler/Medbuzz.git
```

### Setup

2. Navigate into the `Medbuzz` folder and run the following:

```Bash
cd Mebuzz
npm i
```

3. To run the app:

```Bash
npx react-native start --reset-cahce
```

*Note:* `--reset-cache` does not always need to be used, but is best to run if you change the `.env` file.

4. In a new terminal, run one of the following depending on which system you will use:

**For Android:**

```Bash
npm react-native android
```

**For iOS:**

```Bash
npx react-native run-ios-simulator="iPhone 16 Pro Max"
```

*Note:* You do not have to use the phone listed above. Pick whatever device you need to run/test on.

For iOS, you must run the following in the path `Medbuzz/ios/`:

```Bash
pod install
```

Best practice is to also do `rm -rf build/`, then `xcodebuild clean` as this will reset the build cache for XCode.

### Deployment



#### Deployment Keys

Your deployment keys go into the `.env` file. Besure to run `npx react-native start --reset-cache` when ever you change the keys.

## Testing

> Testing Section with links or descriptions of how to test.

Include any subsections as needed.

## Contributors

<!-- Include the email you want to be contacted by and your GitHub profile link.-->

- Jaskirt Kaler (jaskirtkaler@csus.edu)
- Ashar Javid (ajavid@csus.edu)
- Alex Muir (alexmuir@csus.edu)
- Maddie Ananda (manandasubramanian@csus.edu)
- Fadi Zubeideh (fzubeideh@csus.edu)
- Richard E. Varela (rvarela@csus.edu) [GitHub Profile](https://github.com/rvare/)
- Adiba Akter (adibaakter@csus.edu)
- Avneet Brar (avneetbrar@csus.edu)

## Special Thanks



## Software Images




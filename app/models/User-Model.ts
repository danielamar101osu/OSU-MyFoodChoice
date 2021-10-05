export class UserModel {
    public static ALLERGY_TYPES:readonly string[] = ['dairy', 'eggs', 'peanuts', 'shellFish', 'soy', 'treeNuts', 'wheat'];
    public static DIETARY_RESTRICTIONS:readonly string[] = ['beefFree','kosher','pescatarian','porkFree','vegan','vegetarian'];

    constructor(
        private mUID:string = "null",
        private mAge:number = -1,
        private mBuckIdCash: number = -1,
        private mDiningDollars: number = -1,
        private mDotNumber: number = -1,
        private mFirstName: string = "John",
        private mHeightInches: number = -1,
        private mLastName: string = "Doe",
        private mSwipes: number = -1,
        private mWeightLbs: number = -1,
        private mAllergies:Map<string, boolean> = new Map(),
        private mRestrictions:Map<string, boolean> = new Map(),
    ) {
        if (mAllergies.size == 0) {
            for(const at in UserModel.ALLERGY_TYPES) {
                this.mAllergies.set(at, false);
            }
        }

        if (mRestrictions.size == 0) {
            for(const dr in UserModel.DIETARY_RESTRICTIONS) {
                this.mRestrictions.set(dr, false);
            }
        }
        
    }

    public get UID():string {
        return this.mUID;
    }

    public set UID(UID:string) {
        this.mUID = UID;
    }

    public get age(): number {
        return this.mAge;
    }

    public set age(age: number) {
        this.mAge = age;
    }

    public get buckIdCash(): number {
        return this.mBuckIdCash;
    }
    public set buckIdCash(value: number) {
        this.mBuckIdCash = value;
    }

    public get diningDollars(): number {
        return this.mDiningDollars;
    }
    public set diningDollars(value: number) {
        this.mDiningDollars = value;
    }

    public get dotNumber(): number {
        return this.mDotNumber;
    }
    public set dotNumber(value: number) {
        this.mDotNumber = value;
    }

    public get firstName(): string {
        return this.mFirstName;
    }
    public set firstName(value: string) {
        this.mFirstName = value;
    }

    public get heightInches(): number {
        return this.mHeightInches;
    }
    public set heightInches(value: number) {
        this.mHeightInches = value;
    }

    public get swipes(): number {
        return this.mSwipes;
    }
    public set swipes(value: number) {
        this.mSwipes = value;
    }

    public get weightLbs(): number {
        return this.mWeightLbs;
    }
    public set weightLbs(value: number) {
        this.mWeightLbs = value;
    }

    public get lastName(): string {
        return this.mLastName;
    }
    public set lastName(value: string) {
        this.mLastName = value;
    }

    public get allergies() {
        return this.mAllergies;
    }

    public set allergies(m:Map<string, boolean>) {
        this.mAllergies = m;
    }

    public get restrictions() {
        return this.mRestrictions;
    }

    public set restrictions(m:Map<string, boolean>) {
        this.mRestrictions = m;
    }

}
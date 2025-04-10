import { moneyProblem } from "../scripts/utils1.js";
// import { saveToStorage } from "../data/cart.js";


describe('Money problem tests:', () => {
    it('works with normal numbers', () => {
        expect(moneyProblem(2095)).toBe('20.95');
    });
    it('works with 0', () => {
        expect(moneyProblem(0)).toBe('0.00');
    });
    it('works with unNormal numbers', () => {
        expect(moneyProblem(2000.5)).toBe('20.01');
    });
    it('works with unNormal numbers test 2', () => {
        expect(moneyProblem(20.24)).toBe('0.20')
    })
    it('works with unNormal numbers test 3', () => {
        expect(moneyProblem(2000.4)).toBe('20.00')
    })
    it('works with negative numbers', () => {
        expect(moneyProblem(-2.4252)).toBe('-0.02')
    })
});
// describe('data-cart test:', () => {
//     beforeEach(() => {
//         cart = []; // ვასუფთავებთ კალათას
//         jest.spyOn(localStorage, 'setItem'); // ვაკვირდებით setItem-ს
//         saveToStorage(); // ვიძახებთ saveToStorage-ი
//     });

//     it('if cart called checks', () => {
//         expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
//     });
// });
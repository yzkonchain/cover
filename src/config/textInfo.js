const textInfo = {
  bond: 'BOND token is the collateral asset deposited by borrower.',
  want: 'WANT token is the debt asset provided by lender.',
  coll: 'COLL token is the lending certificate.',
  Borrow: `Deposit your COVER token as collateral to borrow mockCOLLAR with fixed-rate interest.
        The term of this loan is 2 years.
        Before its expiry, borrower can withdraw their COVER as long as they repay with either mockCOLLAR or COLL.`,
  Lend: `Lend your mockCOLLAR to borrowers and get the lending certificate, COLL token.
        The term of this loan is 2 years. Before its expiry,
        lenders can withdraw their mockCOLLAR with COLL.`,
  fee: `0.01% nominal fee is charged for each borrow order and no fee is charged for repay order.`,
}

export default textInfo

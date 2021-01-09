/* eslint-disable import/no-default-export */

/** Note: Do not update from template. This file will always look different because we're importing directly from src. */

import chai from "chai"

import { partialDeepEqual } from "@/testing"


chai.use(partialDeepEqual)

export default chai
export const expect = chai.expect

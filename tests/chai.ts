/* eslint-disable import/no-default-export */
/* eslint-disable import/no-unused-modules */
import chai from "chai"

import { partial_deep_equal } from "@/testing"


chai.use(partial_deep_equal)

export default chai
export const expect = chai.expect

import { NodeOpTypes, logNodeOp } from './nodeOps'
import { isOn } from '@vue/shared'
import { PxElement } from './types';
import { patchElementProp } from './nativeRender';
import { parseModifier } from './modifierParse';

export function patchProp(
    el: PxElement,
    key: string,
    prevValue: any,
    nextValue: any,
) {
    logNodeOp({
        type: NodeOpTypes.PATCH,
        targetNode: el,
        propKey: key,
        propPrevValue: prevValue,
        propNextValue: nextValue,
    })
    el.props[key] = nextValue
    if (key === 'modifier') {
        parseModifier(nextValue, el)
        return
    }
    if (isOn(key)) {
        const event = key[2] === ':' ? key.slice(3) : key.slice(2).toLowerCase()
            ; (el.eventListeners || (el.eventListeners = {}))[event] = nextValue
    }
    if (prevValue !== nextValue) {
        patchElementProp(el, key, prevValue, nextValue)
    }
}
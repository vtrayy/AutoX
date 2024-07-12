package com.aiselp.autox.api.ui.component

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.aiselp.autox.api.ui.ComposeElement
import com.aiselp.autox.api.ui.Render

object Column : VueNativeComponent {
    override val tag: String = "column"

    @Composable
    override fun Render(
        modifier: Modifier,
        element: ComposeElement,
        content: @Composable () -> Unit
    ) {
        Column(
            modifier = modifier,
            verticalArrangement = parseVerticalArrangement(element.props["verticalArrangement"] as? String),
            horizontalAlignment = parseHorizontalAlignment(element.props["horizontalAlignment"] as? String)
        ) {
            element.children.forEach {
                parseFloat(it.props["weight"])?.let { weight ->
                    it.modifier =it.modifier.weight(weight)
                }
                it.Render()
            }
        }
    }
}